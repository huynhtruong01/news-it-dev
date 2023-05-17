import { AppDataSource } from '@/config'
import { relationDataUser, selectUserData } from '@/data'
import { User } from '@/entities'
import { IObjectCommon, IUserRes } from '@/models'
import { authService } from '@/services/auth.service'
import { commonService } from '@/services/common.service'
import { roleService } from '@/services/role.service'
import {
    createUserData,
    filtersQuery,
    paginationQuery,
    searchQuery,
    sortQuery,
} from '@/utils'

interface ICheckUser {
    user: User
    userFollower: User
}

class UserService {
    constructor(private userRepository = AppDataSource.getRepository(User)) {}

    // ----------------- CHECK --------------------------
    async checkIdAndUserId(id: number, userId: number): Promise<void | ICheckUser> {
        const self = await this.getById(id)
        const user = await this.getById(userId)

        if (!self || !user) return

        return {
            user: self,
            userFollower: user,
        }
    }

    checkFollows(follows: User[] = [], userId: number) {
        if (!Array.isArray(follows)) return

        const newFollows = follows.map((user) => user.id)
        return newFollows.includes(userId)
    }

    async getAll(query: IObjectCommon): Promise<IUserRes> {
        try {
            const newFiltersQuery = filtersQuery(query)
            const newSortQuery = sortQuery(query)
            const newPaginationQuery = paginationQuery(query)

            const searchUserName = searchQuery(query, 'username')
            // const searchFirstName = searchQuery(query, 'firstName')
            // const searchLastName = searchQuery(query, 'lastName')

            const [users, count] = await this.userRepository.findAndCount({
                order: {
                    ...newSortQuery,
                },
                where: {
                    ...newFiltersQuery,
                    ...searchUserName,
                    // ...searchFirstName,
                    // ...searchLastName,
                    // isAdmin: true,
                },
                ...newPaginationQuery,
                relations: relationDataUser,
                select: selectUserData,
            })

            return [users, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: User): Promise<User> {
        try {
            const user = createUserData(data)

            // TODO: add role when create user
            const roles = await roleService.getAllRolesById(data.roleIds || [])
            user.roles = roles

            // create slug by username
            user.slug = commonService.generateSlug(user.username)

            // hash password
            user.password = await commonService.hashPassword(user.password as string)

            const newUser = await this.userRepository.save(user)

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id
    async getById(id: number): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id,
                },
                select: selectUserData,
                relations: relationDataUser,
            })
            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by username
    async getByUsername(username: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    username,
                },
                select: selectUserData,
                relations: relationDataUser,
            })
            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get user by filter saves
    async getFilterSaves(id: number, filters: IObjectCommon): Promise<User | null> {
        try {
            const user = await this.getById(id)
            if (!user) return null

            // const hashTags = () => {
            //     const hashTagSaves =
            //         user?.saves?.reduce((tags: HashTag[], news) => {
            //             return [...tags, ...(news.hashTags || [])]
            //         }, []) || []

            //     return removeDuplicated<HashTag>(hashTagSaves as HashTag[]) || []
            // }

            const newNews = user.saves?.filter((n) => {
                const search = n.title
                    .toLowerCase()
                    .includes((filters.search as string).toLowerCase())
                if (!filters.tag) return search

                const hasIncludeTag = n.hashTags?.some(
                    (tag) =>
                        tag.name.toLowerCase() === (filters.tag as string).toLowerCase()
                )

                return search && hasIncludeTag
            })

            user.saves = newNews

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update
    async update(userId: number, data: User): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                },
            })
            if (!user) return null

            const checkUsername = await authService.checkEmailOrUsername(data.username)
            const checkEmail = await authService.checkEmailOrUsername(data.emailAddress)

            if (checkUsername && checkUsername.id !== userId) {
                throw new Error(
                    `'${checkUsername.username}' is exits. Choose another username.`
                )
            }

            if (checkEmail && checkEmail.id !== userId) {
                throw new Error(
                    `'${checkEmail.emailAddress}' is exits. Choose another email.`
                )
            }

            if (data.username) {
                data.slug = commonService.generateSlug(data.username)
            }

            const newUser = await this.userRepository.save({
                ...user,
                username: data.username,
                firstName: data.firstName || user.firstName,
                lastName: data.lastName || user.lastName,
                emailAddress: data.emailAddress || user.emailAddress,
                websiteUrl: data.websiteUrl || user.websiteUrl,
                bio: data.bio || user.bio,
                currentlyLearning: data.currentlyLearning || user.currentlyLearning,
                skillLanguages: data.skillLanguages || user.skillLanguages,
                education: data.education || user.education,
                work: data.work || user.work,
                slug: data.slug || user.slug,
                avatar: data.avatar || user.avatar,
            })

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update all
    async updateAll(userId: number, data: User): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                },
            })
            if (!user) return null

            const checkUsername = await authService.checkEmailOrUsername(data.username)
            const checkEmail = await authService.checkEmailOrUsername(data.username)

            if (checkUsername && checkUsername.id !== data.id) {
                throw new Error(`${data.username} is exits. Choose another username.`)
            }

            if (checkEmail && checkEmail.id !== data.id) {
                throw new Error(`${data.emailAddress} is exits. Choose another email.`)
            }

            if (data.username) {
                data.slug = commonService.generateSlug(data.username)
            }

            const newUser = await this.userRepository.save({
                ...user,
                ...data,
            })

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async countNews(user: User) {
        try {
            const newUser = user
            newUser.newsCount = newUser.newsCount + 1

            await this.userRepository.save({ ...newUser })
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete
    async delete(id: number): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id,
                },
            })

            if (!user) return null

            await this.userRepository.delete(id)
            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // TODO: edit profile
    async updateProfile(userId: number, data: User) {
        try {
            const user = await this.getById(userId)
            if (!user) throw new Error('Not found this user to update profile.')

            const newUser = await this.update(userId, data)
            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // follow
    async follow(id: number, userId: number): Promise<User | unknown> {
        try {
            // check id and userId
            const checkUsers = await this.checkIdAndUserId(id, userId)
            if (!checkUsers) throw new Error('Unauthorized or this user is not exits.')
            const { user, userFollower } = checkUsers

            // check following include userId
            if (this.checkFollows(user.following, userId))
                throw new Error(`'${user.username}' is following.`)
            if (this.checkFollows(userFollower.followers, id))
                throw new Error(
                    `'${userFollower.username}' has follower '${user.username}'.`
                )

            user.following?.push(userFollower)
            // add userId into following
            const newUser = await this.userRepository.save(user)

            // add id into follower of this userId
            userFollower.followers?.push(newUser)
            await this.userRepository.save(userFollower)

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // unfollow
    async unfollow(id: number, userId: number): Promise<User | unknown> {
        try {
            // check id and userId
            const checkUsers = await this.checkIdAndUserId(id, userId)
            if (!checkUsers) throw new Error('Unauthorized or this user is not exits.')
            const { user, userFollower } = checkUsers

            // check following include userId
            if (!this.checkFollows(user.following, userId))
                throw new Error(`'${user.username}' isn't following to unfollowing.`)
            if (!this.checkFollows(userFollower.followers, id))
                throw new Error(
                    `'${userFollower.username}' doesn't have follower '${user.username} to unfollow'.`
                )

            let newUser: null | User = null

            // remove userId into following
            const idx = user.following?.findIndex((follow) => follow.id === userId)
            if (typeof idx === 'number' && idx >= 0) {
                user.following?.splice(idx, 1)
                const updateUser = await this.userRepository.save(user)
                newUser = updateUser
            }

            // remove id into follower of this userId
            const idxUser = userFollower.followers?.findIndex(
                (follow) => follow.id === id
            )
            if (typeof idxUser === 'number' && idxUser >= 0) {
                userFollower.followers?.splice(idxUser, 1)
                await this.userRepository.save(userFollower)
            }

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const userService = new UserService()
