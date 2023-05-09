import { Status } from '../enums'
import { IOptionItem, IImgType } from './common'

export interface INewsData {
    id?: number
    title: string
    sapo?: string
    content: string
    newsViews?: number
    status: Status.DRAFT | Status.PUBLIC | Status.UNPUBLIC
    likes?: number
    coverImage?: IImgType
    thumbnailImage?: IImgType
    user?: string
    numLikes?: number
    hashTags: IOptionItem[]
    readTimes: number
    hashTagOptionIds?: IOptionItem[]
}

export interface INewsTable extends INewsData {
    createdAt: Date
}

export interface INews extends INewsData {
    createdAt: Date
}
