import { IDebounceCallback, ISynthetic, IOptionItem } from '@/models'
import debounce from 'lodash.debounce'

export const generateLinkImg = (file: File) => {
    return URL.createObjectURL(file)
}

export const debounceFunc = (callback: IDebounceCallback, times: number) =>
    debounce(callback, times)

export const removeDuplicated = <T extends ISynthetic>(arr: T[]) => {
    const newArr: T[] = []
    arr.forEach((item) => {
        const idsNewArr = newArr.map((i) => i.id)
        const checkExist = idsNewArr.includes(item.id)
        if (!checkExist) newArr.push(item)
    })

    return newArr
}

export const generateIds = (options: IOptionItem[]): number[] => {
    return options.map((item) => item.id)
}

export const analystTextToUsernames = (text: string) => {
    const mentionRegex = /@\[([\w\s]+)\]\((\d+)\)/g
    const matches = text.matchAll(mentionRegex)
    const mentions = Array.from(matches, (match: string[]) => match[1])

    return [...new Set(mentions)]
}

export const convertMentionToHtml = (text: string) => {
    const mentionRegex = /@\[([\w\s]+)\]\((\d+)\)/g
    const convertedText = text.replace(mentionRegex, "<span class='mention'>@$1</span>")

    return convertedText
}

export const convertHTMLToLowercase = (htmlString) => {
    return htmlString.replace(/<([^>]+)>/g, (match, p1) => {
        const tag = p1.toLowerCase()
        const attributes =
            tag.match(/(?:\s+([^=\s]+)(?:(=)(?:"([^"]*)|'([^']*)'|([^>\s]+)))?)?/g) || []

        const convertedAttributes = attributes.map((attribute) => {
            return attribute.toLowerCase()
        })

        return `<${tag}${convertedAttributes.join(' ')}>`
    })
}

export const calcReadTimes = (content: string) => {
    const wpm = 225
    const words = content.trim().split(/\s+/).length
    const time = Math.ceil(words / wpm)
    return time
}
