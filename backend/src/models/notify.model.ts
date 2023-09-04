import { News, User } from '@/entities'
import { NotifyType } from '@/enums'

export type INotifyType =
    | NotifyType.COMMENT
    | NotifyType.FOLLOW
    | NotifyType.LIKE
    | NotifyType.LIKE_COMMENT
    | NotifyType.REPLY
    | NotifyType.DEFAULT

export interface INotifyData {
    userId: number
    newsId?: number | null
    user?: User
    news?: News
    recipients?: User[]
    readUsers?: (number | string)[]
    text: string
    commentText?: string
    type?: INotifyType
}
