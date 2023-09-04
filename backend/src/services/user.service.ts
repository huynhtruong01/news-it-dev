import { AppDataSource } from '@/config'
import { News, User, UserFollow, UserSave } from '@/entities'
import { Order } from '@/enums'
import { IObjectCommon, IOrder, IUserRes } from '@/models'
import { authService } from '@/services/auth.service'
import { commonService } from '@/services/common.service'
import { roleService } from '@/services/role.service'
import {
    createUserData,
    createUserFollow,
    paginationQuery,
    recommenderUsers,
} from '@/utils'

interface ICheckUser {
    user: User
    userFollower: User
}

class UserService {
    constructor(
        private userRepository = AppDataSource.getRepository(User),
        private userFollowRepository = AppDataSource.getRepository(UserFollow)
    ) {}

    // ----------------- CHECK --------------------------
    async checkIdAndUserId(id: number, userId: number): Promise<void | ICheckUser> {
        const self = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.following', 'following')
            .where('user.id = :userId', {
                userId: id,
            })
            .getOne()
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.followers', 'followers')
            .where('user.id = :userId', {
                userId,
            })
            .getOne()

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
            const { take, skip } = paginationQuery(query)

            const conditionsSearch = ((query.search as string) || '')
                .split(' ')
                .map((k) => k.toLowerCase())
            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.roles', 'roles')
                .leftJoinAndSelect('user.followers', 'followers')
                .leftJoinAndSelect('followers.user', 'followersUser')
                .leftJoinAndSelect('user.following', 'following')
                .leftJoinAndSelect('following.follower', 'userFollowing')
                .leftJoinAndSelect('user.hashTags', 'hashTags')
                .leftJoinAndSelect('user.news', 'news')
                .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                .leftJoinAndSelect('newsLikes.news', 'newsLikesUser')
                .leftJoinAndSelect('user.saves', 'saves')
                .leftJoinAndSelect('saves.news', 'newsSaves')
                .leftJoinAndSelect('user.comments', 'comments')
                .leftJoinAndSelect('user.commentLikes', 'commentLikes')
                .orderBy('user.createdAt', (query.createdAt as IOrder) || Order.DESC)
                .take(take)
                .skip(skip)

            if (query.newsCount) {
                queryBuilder.orderBy('user.newsCount', query.newsCount as IOrder)
            }

            if (query.search) {
                queryBuilder.andWhere(
                    conditionsSearch
                        .map((keyword) => {
                            return `LOWER(user.username) LIKE :${keyword}`
                        })
                        .join(' OR '),
                    conditionsSearch.reduce((params, keyword) => {
                        return { ...params, [keyword]: `%${keyword}%` }
                    }, {})
                )
            }

            if (query.isActive) {
                queryBuilder
                    .andWhere('user.isActive = :isActive')
                    .setParameter('isActive', query.isActive === 'true' ? 1 : 0)
            }

            if (query.isAdmin) {
                queryBuilder.andWhere('roles.id = :roleId', { roleId: query.isAdmin })
                // .setParameter('isAdmin', query.isAdmin === 'true' ? 1 : 0)
            }

            const [users, count] = await queryBuilder.getManyAndCount()

            return [users, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get all user suggestion
    async getAllSuggestion(user: User): Promise<User[]> {
        try {
            // 1. get all user not in following
            const self = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.following', 'following')
                .leftJoinAndSelect('following.follower', 'follower')
                .leftJoinAndSelect('user.followers', 'followers')
                .leftJoinAndSelect('user.saves', 'saves')
                .leftJoinAndSelect('user.comments', 'comments')
                .leftJoinAndSelect('user.news', 'news')
                .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                .where('user.id = :userId', {
                    userId: user.id,
                })
                .getOne()
            if (!self) return []

            const followingIds = self.following?.map((u) => u.followerId) as number[]

            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                .where('user.id != :userId', {
                    userId: self.id,
                })

            if (followingIds.length) {
                queryBuilder.andWhere('user.id NOT IN (:...followingIds)', {
                    followingIds,
                })
            }
            const users = await queryBuilder.getMany()

            const similarityUsers = recommenderUsers(self, users)
                .filter((u) => u.score >= 0.5)
                .sort((a, b) => b.score - a.score)
                .map((u) => u.user)

            return similarityUsers
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get top user
    async getTopFollowers(): Promise<User[]> {
        try {
            const users = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.followers', 'followers')
                .orderBy('user.numFollowers', Order.DESC)
                .skip(0)
                .take(8)
                .getMany()
            const newUser = users.filter((u) => u.numFollowers > 0)

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: User): Promise<User> {
        try {
            const user = createUserData(data)

            // add role when create user
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
            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.followers', 'followers')
                .leftJoinAndSelect('followers.user', 'followersUser')
                .leftJoinAndSelect('user.following', 'following')
                .leftJoinAndSelect('following.follower', 'userFollowing')
                .leftJoinAndSelect('user.hashTags', 'hashTags')
                .leftJoinAndSelect('user.news', 'news')
                .leftJoinAndSelect('news.likes', 'likesNews')
                .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                .leftJoinAndSelect('newsLikes.news', 'newsNewsLikes')
                .leftJoinAndSelect('newsNewsLikes.user', 'newsLikesUser')
                .leftJoinAndSelect('newsNewsLikes.likes', 'likes')
                .leftJoinAndSelect('user.saves', 'saves')
                .leftJoinAndSelect('saves.news', 'newsSaves')
                .leftJoinAndSelect('newsSaves.likes', 'saveLikes')
                .leftJoinAndSelect('newsSaves.user', 'saveUser')
                .leftJoinAndSelect('newsSaves.hashTags', 'saveUserHashTags')
                .leftJoinAndSelect('user.searchHistory', 'searchHistory')

            const user = await queryBuilder
                .where('user.id = :userId', { userId: id })
                .getOne()

            if (!user) return null

            const newUser = {
                ...user,
                following: user?.following?.map((u) => ({
                    ...(u.follower as User),
                })),
                followers: user?.followers?.map((u) => ({
                    ...(u.user as User),
                })),
                newsLikes: user?.newsLikes?.map((u) => ({
                    ...(u.news as News),
                })),
                saves: user?.saves?.map((u) => ({
                    ...(u.news as News),
                })),
            } as User

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getByIdSaves(id: number): Promise<User | null> {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.saves', 'saves')
                .leftJoinAndSelect('saves.news', 'newsSave')
                .leftJoinAndSelect('newsSave.hashTags', 'newsSaveHashTags')
                .leftJoinAndSelect('newsSave.user', 'newsSaveUser')
                .where('user.id = :userId', { userId: id })
                .getOne()
            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id for comment
    async getByIdComment(id: number) {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.followers', 'followers')
                .where('user.id = :userId', { userId: id })
                .getOne()
            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by username
    async getByUsername(username: string, noRelations = false): Promise<User | null> {
        try {
            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.news', 'news')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                .leftJoinAndSelect('user.hashTags', 'hashTags')
                .leftJoinAndSelect('user.followers', 'followers')
                .leftJoinAndSelect('user.following', 'following')

            if (!noRelations) {
                queryBuilder
                    .leftJoinAndSelect('user.roles', 'roles')
                    .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                    .leftJoinAndSelect('newsLikes.news', 'newsNewsLikes')
                    .leftJoinAndSelect('newsNewsLikes.hashTags', 'newsLikesHashTags')
                    .leftJoinAndSelect('newsNewsLikes.user', 'newsLikesUser')
                    .leftJoinAndSelect('newsNewsLikes.likes', 'likes')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.news', 'newsSaves')
                    .leftJoinAndSelect('newsSaves.likes', 'saveLikes')
                    .leftJoinAndSelect('newsSaves.user', 'saveUser')
                    .leftJoinAndSelect('user.comments', 'comments')
                    .leftJoinAndSelect('user.commentLikes', 'commentLikes')
            }

            const user = await queryBuilder
                .where('user.username = :username', { username })
                .getOne()
            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get user by filter saves
    async getFilterSaves(id: number, filters: IObjectCommon): Promise<User | null> {
        try {
            const user = await this.getByIdSaves(id)
            if (!user) return null

            const newNews = user.saves?.filter((userSave) => {
                const search =
                    filters.search === '' || !filters.search
                        ? true
                        : (filters.search as string)
                              .toLowerCase()
                              .split(' ')
                              .filter((x) => !!x)
                              .some((w) =>
                                  userSave.news?.title?.toLowerCase().includes(w)
                              )
                if (!filters.tag) return search

                const hasIncludeTag = userSave.news?.hashTags?.some(
                    (tag) =>
                        tag.name.toLowerCase() === (filters.tag as string).toLowerCase()
                )

                return search && hasIncludeTag
            })

            user.saves = newNews?.map(
                (userSave) =>
                    ({
                        ...userSave.news,
                    } as UserSave)
            )

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by email
    async getByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    emailAddress: email,
                },
            })

            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id for hash tag
    async getByIdHashTag(id: number) {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.hashTags', 'hashTags')
                .where('user.id = :userId', { userId: id })
                .getOne()

            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id no relation
    async getByIdNoRelations(id: number, hasRole = false) {
        try {
            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .where('user.id = :userId', { userId: id })

            if (hasRole) {
                queryBuilder.leftJoinAndSelect('user.roles', 'role')
            }

            const user = await queryBuilder.getOne()
            if (!user) return null

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

            const roles = await roleService.getAllRolesById(data.roleIds || [])
            user.roles = roles

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
                bandingColor: data.bandingColor || user.bandingColor,
                isAdmin: data.isAdmin || user.isAdmin,
            })

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update all
    async updateAll(
        userId: number,
        data: User,
        noCheckUsername = false
    ): Promise<User | null> {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.id = :userId', { userId })
                .getOne()
            if (!user) return null

            if (!noCheckUsername) {
                const checkUsername = await authService.checkEmailOrUsername(
                    data.username
                )
                const checkEmail = await authService.checkEmailOrUsername(data.username)

                if (checkUsername && checkUsername.id !== data.id) {
                    throw new Error(`${data.username} is exits. Choose another username.`)
                }

                if (checkEmail && checkEmail.id !== data.id) {
                    throw new Error(
                        `${data.emailAddress} is exits. Choose another email.`
                    )
                }

                if (data.username) {
                    data.slug = commonService.generateSlug(data.username)
                }
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

    // save user
    async saveUser(user: User) {
        try {
            const newUser = await this.userRepository.save(user)
            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // count news
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
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.id = :userId', {
                    userId: id,
                })
                .getOne()

            if (!user) return null

            await this.userRepository.delete(id)
            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // edit profile
    async updateProfile(userId: number, data: User) {
        try {
            const user = await this.getByIdNoRelations(userId)
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
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.id = :userId', {
                    userId: id,
                })
                .getOne()

            const userFollow = await this.userRepository
                .createQueryBuilder('follower')
                .where('follower.id = :followerId', {
                    followerId: userId,
                })
                .getOne()

            if (!user || !userFollow) {
                throw new Error('User or user to follow not found')
            }

            const existingFollow = await this.userFollowRepository.findOne({
                where: { user: { id: user.id }, follower: { id: userFollow.id } },
            })

            if (existingFollow) {
                throw new Error('User is already being followed')
            }

            const follower = createUserFollow({
                userId: id,
                followerId: userId,
                user,
                follower: userFollow,
            })

            const newFollower = await this.userFollowRepository.save(follower)
            return newFollower
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // unfollow
    async unfollow(id: number, userId: number): Promise<User | unknown> {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.id = :userId', {
                    userId: id,
                })
                .getOne()

            const userFollow = await this.userRepository
                .createQueryBuilder('follower')
                .where('follower.id = :followerId', {
                    followerId: userId,
                })
                .getOne()

            if (!user || !userFollow) {
                throw new Error('User or user to unfollow not found')
            }

            const follow = await this.userFollowRepository.findOne({
                where: { user: { id: user.id }, follower: { id: userFollow.id } },
            })

            if (!follow) {
                throw new Error('User is not being followed')
            }

            await this.userFollowRepository.remove(follow)
            return follow
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const userService = new UserService()
