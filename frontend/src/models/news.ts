import { NewsFilters } from '@/enums'
import { IHashTag, IUser } from '.'

export interface INewsData {
    title: string
    sapo?: string
    readTimes: number
    numLikes?: number
    numComments?: number
    numSaves?: number
    thumbnailImage?: string
    coverImage?: string
    userId: number
    content: string
    status: string
    slug?: string
    newsViews?: number
    saveUsers?: IUser[]
    likes?: IUser[]
    comments?: IUser[]
    user?: IUser
    hashTags?: IHashTag[]
    hashTagIds?: number[]
    createdAt?: Date
    updatedAt?: Date
}

export interface INews extends INewsData {
    id: number
}

export type INewsStatus = NewsFilters.LATEST | NewsFilters.TOP
