import { INews, IUser } from '.'

export interface ICommentData {
    id?: number
    userId: number
    newsId: number
    parentCommentId?: number | null
    parentComment?: IComment
    childrenComments?: IComment[]
    news?: INews
    user?: IUser
    comment: string
    numLikes?: number
    likes?: IComment[]
    createdAt?: Date
    updatedAt?: Date
}

export interface IComment extends Omit<ICommentData, 'id'> {
    id: number
}

export interface ICommentRes {
    comments: IComment[]
    total: number
}
