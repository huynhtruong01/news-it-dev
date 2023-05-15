import { MAX_AGE_REFRESH_TOKEN } from '@/consts'
import { HashTag, News, Role, User, Comment } from '@/entities'
import { NewsStatus } from '@/enums'
import { CookieOptions } from 'express'

export const createUserData = (data: User): User => {
    const user = new User()
    user.username = data.username
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.emailAddress = data.emailAddress
    user.password = data.password
    user.dateJoined = new Date()
    user.isAdmin = data.isAdmin

    return user
}

export const createRoleData = (data: Role): Role => {
    const role = new Role()
    role.name = data.name
    role.description = data.description
    role.color = data.color

    return role
}

export const createHashTag = (data: HashTag): HashTag => {
    const hashTag = new HashTag()
    hashTag.name = data.name
    hashTag.title = data.title
    hashTag.description = data.description || ''
    hashTag.color = data.color
    hashTag.iconImage = data.iconImage

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
    news.hashTagIds = data.hashTagIds

    return news
}

export const createComment = (data: Comment): Comment => {
    const comment = new Comment()
    comment.comment = data.comment
    comment.parentCommentId = data.parentCommentId
    comment.newsId = data.newsId
    comment.userId = data.userId

    return comment
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
