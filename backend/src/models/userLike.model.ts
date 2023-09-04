import { News, User } from '@/entities'

export interface IUserLikeData {
    userId: number
    newsId: number
    user: User
    news: News
}

export interface IUserSaveData {
    userId: number
    newsId: number
    user: User
    news: News
}
