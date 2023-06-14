import { ALL } from '@/consts'
import { IFilters, INews, IUser } from '.'
import { NotifyType } from '@/enums'

export type INotifyType =
    | NotifyType.COMMENT
    | NotifyType.FOLLOW
    | NotifyType.LIKE
    | NotifyType.LIKE_COMMENT
    | NotifyType.REPLY
    | NotifyType.DEFAULT

export interface INotifyData {
    id?: number
    userId: number
    newsId: number | null
    user?: IUser
    news?: INews | null
    text?: string
    commentText?: string
    recipients?: IUser[]
    readUsers?: (string | number)[]
    type?: INotifyType
    createdAt?: Date
    updatedAt?: Date
}

export interface INotify extends Omit<INotifyData, 'id'> {
    id: number
}

export interface INotifyDataComment extends INotifyData {
    users?: string[]
}

export interface INotifyRes {
    userId?: number
    notifies: INotify[]
    total: number
}

export type INotifyRead = number | typeof ALL

export interface INotifyFilters {
    page: number
    limit: number
    isRead?: INotifyRead
    search?: string
    type?: string
}

export interface INotifiesFilter {
    filters: IFilters
    userId: number
}

export interface INotifyUpdateRead {
    notify: INotify
    userId: number
}

export interface INotifyUpdateReadParams {
    notifyId: number
    userId: number
}

export interface ISetNotifications {
    filters: INotifyFilters
    userId: number
}

export interface INotifyNewNews {
    news: INews
    notify: INotifyData
}
