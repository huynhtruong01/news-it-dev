export interface IUserData {
    id?: number
    username: string
    firstName: string
    lastName: string
    emailAddress: string
    isAdmin: boolean
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
    createdAt: Date
}
