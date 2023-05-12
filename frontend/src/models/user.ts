import { IComment, IHashTag, INews, IOptionItem } from '.'

export type IRoleIds = IOptionItem[]

export interface IUserData {
    id?: number
    username: string
    firstName: string
    lastName: string
    emailAddress: string
    isAdmin: boolean
    avatar?: string
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
    followers?: IUser[]
    following?: IUser[]
    newsLikes?: IUser[]
    save?: IUser[]
    news?: INews[]
    comments?: IComment[]
    hashTags?: IHashTag[]
    isActive?: boolean
    slug?: string
    dateJoined?: Date
    createdAt?: Date
    updatedAt?: Date
}

export interface IUser extends IUserData {
    id: number
}
