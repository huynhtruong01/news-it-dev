import { Status } from '../enums'
import { IOptionItem, IImgType } from './common'

export type IStatus = Status.DRAFT | Status.PUBLIC | Status.UNPUBLIC

export interface INewsData {
    id?: number
    title: string
    sapo?: string
    content: string
    newsViews?: number
    status: IStatus
    likes?: number
    coverImage?: IImgType
    thumbnailImage?: IImgType
    user?: string
    numLikes?: number
    hashTags: IOptionItem[]
    hashTagIds?: number[]
    readTimes: number
    hashTagOptionIds?: IOptionItem[]
}

export interface INewsTable extends INewsData {
    createdAt: Date
}

export interface INews extends INewsData {
    createdAt: Date
}

export interface INewsRes {
    news: INews[]
    total: number
}
