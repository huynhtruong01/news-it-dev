import { NewsFilters, Status } from '@/enums'
import { IHashTag, IUser, IImgType } from '.'

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

export interface INewsForm {
    title: string
    sapo?: string
    thumbnailImage?: IImgType
    coverImage?: IImgType
    content: string
    status: Status.DRAFT | Status.PUBLIC | Status.UNPUBLIC
    hashTags?: IHashTag[]
    readTimes?: number
    hashTagOptionIds?: number[]
}

export interface INews extends INewsData {
    id: number
}

export type INewsStatus = NewsFilters.LATEST | NewsFilters.TOP
