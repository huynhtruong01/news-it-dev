import { stopWordsVn } from '@/data'
import { News, User } from '@/entities'

export const stopWords = (content: string) => {
    const specialCharsPattern = /[.?!,~`@#$%^&*()-_+={}:;"'<>]+|\.{3,}/g
    const newContent = content
        .toLocaleLowerCase()
        .replace(specialCharsPattern, '')
        .split(' ')
        .filter((w) => !stopWordsVn.includes(w))
        .join(' ')

    return newContent
}

export const convertTitleToVector = (
    uniqueWord: string[],
    content: string,
    length = 0
) => {
    const word = content.split(' ')
    const wordContent = Array.from(new Set(word))

    const vector: number[] = Array(length ? length : wordContent.length).fill(0)

    for (const w of wordContent) {
        const index = uniqueWord.indexOf(w)
        if (index > -1 && index <= length) {
            vector[index] += 1
        }
    }

    return vector
}

export const calcLengthUniqueWord = (content: string) => {
    const word = content.split(' ')
    const wordContent = Array.from(new Set(word))
    return wordContent
}

export const calcCosineSimilarity = (content: number[], contentCompare: number[]) => {
    const dotProduct = content.reduce(
        (acc, value, index) => acc + value * contentCompare[index],
        0
    )
    const magnitudeA = Math.sqrt(content.reduce((acc, value) => acc + value * value, 0))
    const magnitudeB = Math.sqrt(
        contentCompare.reduce((acc, value) => acc + value * value, 0)
    )
    return dotProduct / (magnitudeA * magnitudeB) || 0
}

export const recommenderNews = (content: string, newsList: News[]) => {
    const newContent = stopWords(content)
    const uniqueWords = calcLengthUniqueWord(newContent)
    const titleVector = convertTitleToVector(uniqueWords, newContent, uniqueWords.length)
    const results = []

    for (const news of newsList) {
        const content = stopWords(news.title)
        const titleVectorCompare = convertTitleToVector(
            uniqueWords,
            content,
            uniqueWords.length
        )
        const similarity = calcCosineSimilarity(titleVector, titleVectorCompare)
        results.push({
            news,
            similarity,
        })
    }

    return results
}

// USERS

export const calcJaccardSimilarity = (
    setTargetUser: number[],
    setUser: number[]
): number => {
    const intersection = setTargetUser.filter((item) => setUser.includes(item))
    const union = [...new Set([...setTargetUser, ...setUser])]

    if (union.length === 0) {
        return 0
    }

    return intersection.length / union.length
}

export const recommenderUsers = (targetUser: User, users: User[]) => {
    const likesTargetUser = targetUser.newsLikes?.map((n) => n.newsId) || []

    const recommends = []
    for (const u of users) {
        const likesUser = u.newsLikes?.map((n) => n.newsId) || []
        const score = calcJaccardSimilarity(likesTargetUser, likesUser)
        recommends.push({
            user: u,
            score,
        })
    }

    return recommends
}
