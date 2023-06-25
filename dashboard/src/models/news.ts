import { Status, StatusUser } from '../enums'
import { IOptionItem, IImgType } from './common'
import { IReport } from './report'

export type IStatus =
    | Status.DRAFT
    | Status.PUBLIC
    | Status.UNPUBLIC
    | StatusUser.ACTIVE
    | StatusUser.INACTIVE

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
    reporterNews?: IReport[]
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
