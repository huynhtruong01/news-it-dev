import { News, User } from '@/entities'

export interface INotifyData {
    userId: number
    newsId?: number | null
    user?: User
    news?: News
    recipients?: User[]
    readUsers?: (number | string)[]
    text: string
}
