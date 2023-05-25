import { ALL } from '@/consts'
import { INews, IUser } from '.'

export interface INotifyData {
    id?: number
    userId: number
    newsId: number
    user?: IUser
    news?: INews
    recipients?: IUser[]
    isRead: boolean
    createdAt: Date
    updatedAt: Date
}

export interface INotify extends Omit<INotifyData, 'id'> {
    id: number
}

export interface INotifyRes {
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
