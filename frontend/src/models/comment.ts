import { INews, IUser } from '.'

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
    numReplyComments?: number
    likes?: IUser[]
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

export interface ICommentLikeNotify {
    user: IUser
    news: INews
    comment: IComment
}
