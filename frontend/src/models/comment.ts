import { INews, IUser } from '.'

export interface ICommentData {
    userId: number
    newsId: number
    parentCommentId?: number
    childrenComments?: IComment[]
    news?: INews
    user?: IUser
    comment: string
    numLikes?: number
    createdAt?: Date
    updatedAt?: Date
}

export interface IComment extends ICommentData {
    id: number
}
