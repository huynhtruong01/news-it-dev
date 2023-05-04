import { Status } from '../enums'

export interface INewsData {
    id?: number
    title: string
    sapo?: string
    content: string
    newsViews?: number
    status: Status.DRAFT | Status.PUBLIC | Status.UNPUBLIC
    likes?: number
    coverImage: string
    thumbnailImage?: string
    user?: string
    hashTags: string[]
    readTimes: number
}

export interface INewsTable extends INewsData {
    createdAt: Date
}

export interface INews extends INewsData {
    createdAt: Date
}
