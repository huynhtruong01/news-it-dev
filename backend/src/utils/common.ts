import { AVATAR, DEFAULT_COLOR, MAX_AGE_REFRESH_TOKEN } from '@/consts'
import {
    HashTag,
    News,
    Role,
    User,
    Comment,
    Notify,
    UserSearchHistory,
    UserLike,
    UserSave,
    Report,
    UserFollow,
} from '@/entities'
import { NewsStatus, NotifyType, StatusReport } from '@/enums'
import { INotifyData, IUserFollowerData, IUserLikeData, IUserSaveData } from '@/models'
import { CookieOptions } from 'express'

export const convertMentionToHtml = (text: string) => {
    const mentionRegex = /@\[([\w\s]+)\]\((\d+)\)/g
    const convertedText = text.replace(mentionRegex, "<span class='mention'>@$1</span>")

    return convertedText
}

export const createUserData = (data: User): User => {
    const user = new User()
    user.username = data.username
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.emailAddress = data.emailAddress
    user.password = data.password
    user.dateJoined = new Date()
    user.roleIds = [2]
    user.isAdmin = data.isAdmin ? data.isAdmin : false
    user.bandingColor = data.bandingColor ? data.bandingColor : DEFAULT_COLOR
    user.avatar = !data.avatar ? AVATAR : data.avatar
    user.type = data.type ? data.type : 'register'

    return user
}

export const createRoleData = (data: Role): Role => {
    const role = new Role()
    role.name = data.name
    role.description = data.description || ''
    role.color = data.color

    return role
}

export const createHashTag = (data: HashTag): HashTag => {
    const hashTag = new HashTag()
    hashTag.name = data.name
    hashTag.title = data.title
    hashTag.description = data.description || ''
    hashTag.color = data.color
    hashTag.iconImage = data.iconImage || ''

    return hashTag
}

export const createNews = (data: News): News => {
    const news = new News()
    news.title = data.title
    news.sapo = data.sapo || ''
    news.content = data.content
    news.status = data.status || NewsStatus.DRAFT
    news.thumbnailImage = data.thumbnailImage
    news.coverImage = data.coverImage
    news.readTimes = data.readTimes
    news.userId = data.userId
    news.hashTagIds = data.hashTagIds || []

    return news
}

export const createComment = (data: Comment): Comment => {
    const comment = new Comment()
    comment.comment = convertMentionToHtml(data.comment)
    comment.parentCommentId = data.parentCommentId || null
    comment.newsId = data.newsId
    comment.userId = data.userId
    comment.replyUserId = data.replyUserId ? data.replyUserId : null

    return comment
}

export const createNotify = (data: INotifyData): Notify => {
    const notify = new Notify()
    notify.userId = data.userId
    notify.newsId = data.newsId ? data.newsId : null
    notify.recipients = (data.recipients as User[])?.length > 0 ? data.recipients : []
    notify.readUsers = data.readUsers ? data.readUsers : []
    notify.text = data.text || ''
    notify.commentText = data.commentText ? data.commentText : ''
    notify.type = data.type ? data.type : NotifyType.DEFAULT

    return notify
}

export const createSearchHistory = (data: UserSearchHistory) => {
    const searchHistory = new UserSearchHistory()
    searchHistory.userId = data.userId
    searchHistory.searchQuery = data.searchQuery

    return searchHistory
}

export const createUserLike = (data: IUserLikeData) => {
    const userLike = new UserLike()
    userLike.userId = data.userId
    userLike.newsId = data.newsId
    if (data.user) {
        userLike.user = data.user
    }
    if (data.news) {
        userLike.news = data.news
    }

    return userLike
}

export const createUserSave = (data: IUserSaveData) => {
    const userLike = new UserSave()
    userLike.userId = data.userId
    userLike.newsId = data.newsId
    if (data.user) {
        userLike.user = data.user
    }
    if (data.news) {
        userLike.news = data.news
    }

    return userLike
}

export const createReport = (data: Report) => {
    const report = new Report()
    report.userId = data.userId
    report.newsId = data.newsId
    report.reason = data.reason || ''
    report.status = data.status || StatusReport.OTHER
    if (data.reporter) {
        report.reporter = data.reporter
    }
    if (data.reportNews) {
        report.reportNews = data.reportNews
    }

    return report
}

export const createUserFollow = (data: IUserFollowerData) => {
    const follow = new UserFollow()
    follow.userId = data.userId
    follow.followerId = data.followerId
    if (data.user) {
        follow.user = data.user
    }
    if (data.user) {
        follow.follower = data.follower
    }
    return follow
}

export const optionCookies = (options?: CookieOptions): CookieOptions => {
    return {
        httpOnly: true,
        maxAge: Number(options?.maxAge) || MAX_AGE_REFRESH_TOKEN,
        expires: new Date(
            Date.now() + (Number(options?.maxAge) || MAX_AGE_REFRESH_TOKEN)
        ),
        secure: false,
        sameSite: 'strict',
    }
}

export type ISynthetic = HashTag

export const removeDuplicated = <T extends ISynthetic>(arr: T[]) => {
    const uniqueIds = new Set<number>()
    arr.forEach((item) => {
        uniqueIds.add(item.id as number)
    })

    return arr.filter((item) => uniqueIds.has(item.id as number))
}
