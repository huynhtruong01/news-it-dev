import { User } from '@/entities'

export type IUserRes = [User[], number]

export interface IUserFollowerData {
    userId: number
    followerId: number
    user: User
    follower: User
}
