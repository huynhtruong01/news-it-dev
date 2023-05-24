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
