import { User } from '@/entities'
import { FindOptionsSelect, FindOptionsSelectByString } from 'typeorm'

export const selectUserData:
    | FindOptionsSelect<User>
    | FindOptionsSelectByString<User>
    | undefined = [
    'id',
    'username',
    'firstName',
    'lastName',
    'avatar',
    'bio',
    'currentlyLearning',
    'dateJoined',
    'education',
    'emailAddress',
    'isActive',
    'isAdmin',
    'newsCount',
    'work',
    'websiteUrl',
    'createdAt',
    'updatedAt',
    'slug',
]

export const relationDataUser = {
    roles: true,
    followers: true,
    following: true,
    hashTags: true,
    news: {
        user: true,
    },
    newsLikes: true,
    saves: true,
    comments: true,
}
