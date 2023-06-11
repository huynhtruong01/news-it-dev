import { NotifyType } from '@/enums'
import { IObjectCommon } from '@/models'

export const notifyFilters: IObjectCommon[] = [
    {
        name: 'notifications.not_read',
        value: 0,
    },
    {
        name: 'notifications.read',
        value: 1,
    },
    {
        name: 'notifications.news',
        value: NotifyType.DEFAULT,
    },
    {
        name: 'notifications.followers',
        value: NotifyType.FOLLOW,
    },
    {
        name: 'notifications.comments',
        value: NotifyType.COMMENT,
    },
    {
        name: 'notifications.reply',
        value: NotifyType.REPLY,
    },
    {
        name: 'notifications.like_news',
        value: NotifyType.LIKE,
    },
    {
        name: 'notifications.like_comment',
        value: NotifyType.LIKE_COMMENT,
    },
]
