import { HashTag, News, Role, User, Comment } from '@/entities'
import { NewsStatus } from '@/enums'

export const createUserData = (data: User): User => {
    const user = new User()
    user.username = data.username
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.emailAddress = data.emailAddress
    user.password = data.password
    user.dateJoined = new Date()

    return user
}

export const createRoleData = (data: Role): Role => {
    const role = new Role()
    role.name = data.name

    return role
}

export const createHashTag = (data: HashTag): HashTag => {
    const hashTag = new HashTag()
    hashTag.name = data.name
    hashTag.desciption = data.desciption || ''

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
