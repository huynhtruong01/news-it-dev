import { IRole } from './role'
import { IOptionItem } from './common'

export type IRoleIds = IOptionItem[]

export interface IUserData {
    id?: number
    username: string
    firstName: string
    lastName: string
    emailAddress: string
    isAdmin: boolean
    password?: string
    confirmPassword?: string
    roleOptionIds?: IRoleIds
    roleIds?: number[]
}

export interface IUserTable extends IUserData {
    id: number
    newsCount: number
    isActive: boolean
    avatar: string
    createdAt: Date
}

export interface IUser extends IUserData {
    avatar: string
    dateJoined: Date
    newsCount: number
    newsLikes: number
    isActive: boolean
    roles?: IRole[]
    createdAt: Date
}

export interface IUserRes {
    users: IUser[]
    total: number
}
