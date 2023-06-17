import { Socket } from 'socket.io-client'
import { IComment, IHashTag, INews, IOptionItem } from '.'

export type IRoleIds = IOptionItem[]

export interface IUserLike {
    id: number
    userId: number
    newsId: number
    user?: IUser
    news?: INews
}

export interface IUserData {
    id?: number
    username: string
    firstName: string
    lastName: string
    emailAddress: string
    isAdmin: boolean
    avatar?: string | File
    password?: string
    confirmPassword?: string
    roleOptionIds?: IRoleIds
    roleIds?: number[]
    newsCount?: number
    websiteUrl?: string
    bio?: string
    currentlyLearning?: string
    skillLanguages?: string
    education?: string
    work?: string
    bandingColor?: string
    numFollowing?: number
    numFollowers?: number
    followers?: IUser[]
    following?: IUser[]
    newsLikes?: INews[]
    saves?: INews[]
    news?: INews[]
    comments?: IComment[]
    commentLikes?: IComment[]
    hashTags?: IHashTag[]
    isActive?: boolean
    slug?: string
    type?: string
    dateJoined?: Date
    createdAt?: Date
    updatedAt?: Date
}

export interface IUser extends Omit<IUserData, 'id'> {
    id: number
}
export interface IFiltersNewsSave {
    search: string
    tag?: string
}

export type IFiltersUserNews = IFiltersNewsSave

export interface IFollowNotify {
    socket: Socket
    user: IUser
    userFollow: IUser
}
