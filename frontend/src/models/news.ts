import { NewsFilters } from '@/enums'
import { IHashTag, IUser, IImgType, IComment, IOptionItem, IStatus } from '.'
import { ALL } from '@/consts'
import { Socket } from 'socket.io-client'

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
    comments?: IComment[]
    user?: IUser
    hashTags?: IHashTag[]
    hashTagIds?: number[]
    createdAt?: Date
    updatedAt?: Date
}

export interface INewsForm {
    id?: number
    title: string
    sapo?: string
    thumbnailImage?: IImgType
    coverImage?: IImgType
    content: string
    status: IStatus | string
    hashTags?: IHashTag[]
    readTimes?: number
    hashTagOptionIds?: IOptionItem[]
    hashTagIds?: number[]
}

export interface INews extends INewsData {
    id: number
}

export type INewsStatus = NewsFilters.LATEST | NewsFilters.TOP | NewsFilters.RELEVANT

export interface INewsFilters {
    status?: INewsStatus | typeof ALL
    search?: string
}

export interface INewsActions {
    socket: Socket
    news: INews
    user: IUser
}

export interface INewsRecommend {
    newsId: number
    hashTag?: string
}
