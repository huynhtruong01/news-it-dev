import { ALL } from '@/consts'
import { IFilters, INews, IUser } from '.'

export interface INotifyData {
    id?: number
    userId: number
    newsId: number | null
    user?: IUser
    news?: INews | null
    text?: string
    recipients?: IUser[]
    readUsers?: (string | number)[]
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
