import { INews } from './news'
import { IUser } from './user'

export interface ICommentData {
    id?: number
    userId: number
    newsId: number
    replyUserId?: number | null
    parentCommentId?: number | null
    parentComment?: IComment
    childrenComments?: IComment[]
    news?: INews
    user?: IUser
    replyUser?: IUser
    comment: string
    numLikes?: number
    likes?: IUser[]
    createdAt?: Date
    updatedAt?: Date
}

export interface IComment extends Omit<ICommentData, 'id'> {
    id: number
}
