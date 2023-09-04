import { AppDataSource } from '@/config'
import { HashTag, User } from '@/entities'
import { NewsStatus, Order } from '@/enums'
import { IHashTagRes, IObjectCommon, IOrder } from '@/models'
import { createHashTag, paginationQuery } from '@/utils'
import { commonService } from './common.service'
import { userService } from './user.service'

interface ICheckHashTag {
    user: User
    hashTag: HashTag
}

class HashTagService {
    constructor(private hashTagRepository = AppDataSource.getRepository(HashTag)) {}

    // ------------------------------- CHECK -------------------------------------
    async checkIdAndHashTagId(
        id: number,
        hashTagId: number
    ): Promise<ICheckHashTag | void> {
        const self = await userService.getByIdHashTag(id)
        const hashTag = await this.hashTagRepository.findOne({
            where: {
                id: hashTagId,
            },
            relations: {
                users: true,
            },
        })

        if (!self || !hashTag) return

        return {
            user: self,
            hashTag,
        }
    }

    checkFollows(users: User[] | HashTag[] = [], userId: number) {
        if (!Array.isArray(users)) return

        const newFollows = users.map((user) => user.id)
        return newFollows.includes(userId)
    }

    // check name hash tag exits?
    async checkNameHashTag(name: string): Promise<null | HashTag> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    name,
                },
            })

            if (hashTag) return hashTag

            return null
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // check hash tags ids
    checkHashTagIds(hashTagIds: number[]): boolean | void {
        try {
            if (!Array.isArray(hashTagIds)) return
            if (hashTagIds.length === 0) return

            return true
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get all
    async getAll(): Promise<HashTag[]> {
        try {
            const hashTags = await this.hashTagRepository
                .createQueryBuilder('hashTag')
                .leftJoinAndSelect('hashTag.news', 'news')
                .leftJoinAndSelect('hashTag.users', 'users')
                .getMany()

            return hashTags
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get all by params
    async getAllByParams(query: IObjectCommon): Promise<IHashTagRes> {
        try {
            const { take, skip } = paginationQuery(query)
            const conditionsSearch = ((query.search as string) || '')
                .split(' ')
                .map((k) => k.toLowerCase())

            const queryBuilder = this.hashTagRepository
                .createQueryBuilder('hashTag')
                .leftJoinAndSelect('hashTag.users', 'users')
                .leftJoinAndSelect('hashTag.news', 'news')
                .leftJoinAndSelect('news.user', 'newsUser')
                .take(take)
                .skip(skip)
                .orderBy('hashTag.createdAt', (query.createdAt as IOrder) || Order.DESC)

            if (query.search) {
                queryBuilder.andWhere(
                    conditionsSearch
                        .map((keyword) => {
                            return `LOWER(hashTag.name) LIKE :${keyword}`
                        })
                        .join(' OR '),
                    conditionsSearch.reduce((params, keyword) => {
                        return { ...params, [keyword]: `%${keyword}%` }
                    }, {})
                )
            }

            const [hashTags, count] = await queryBuilder.getManyAndCount()

            return [hashTags, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get all hash tag by id
    async getAllByIds(hashTagIds: number[] = []) {
        try {
            const hashTags = await this.hashTagRepository
                .createQueryBuilder('hashTag')
                .where('hashTag.id IN (:...ids)', {
                    ids: hashTagIds,
                })
                .getMany()

            return hashTags
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getIdNoRelation(id: number) {
        try {
            const hashTags = await this.hashTagRepository
                .createQueryBuilder('hashTag')
                .leftJoinAndSelect('hashTag.users', 'users')
                .where('hashTag.id = hashTagId', {
                    hashTagId: id,
                })
                .getOne()

            if (!hashTags) return null

            return hashTags
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: HashTag): Promise<HashTag> {
        try {
            const hashTag = createHashTag(data)

            // create slug
            hashTag.slug = commonService.generateSlug(data.name)

            const newHashTag = await this.hashTagRepository.save(hashTag)

            return newHashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getById(id: number): Promise<HashTag | null> {
        try {
            const hashTag = await this.hashTagRepository
                .createQueryBuilder('hashTag')
                .leftJoinAndSelect('hashTag.users', 'users')
                .leftJoinAndSelect('hashTag.news', 'news')
                .leftJoinAndSelect('news.user', 'user')
                .where('hashTag.id = :hashTagId', { hashTagId: id })
                .getOne()
            if (!hashTag) return null

            return hashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by name (GET)
    async getByName(name: string): Promise<HashTag | null> {
        try {
            const hashTag = await this.hashTagRepository
                .createQueryBuilder('hashTag')
                .where('hashTag.name = :name', { name })
                .leftJoinAndSelect('hashTag.users', 'users')
                .leftJoinAndSelect('hashTag.news', 'news', 'news.status = :status', {
                    status: NewsStatus.PUBLIC,
                })
                .leftJoinAndSelect('news.user', 'user')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .getOne()

            if (!hashTag) return null

            return hashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update (PUT)
    async update(data: HashTag): Promise<HashTag | null> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!hashTag) return null

            if (data.name) {
                data.slug = commonService.generateSlug(data.name)
            }

            const newHashTag = await this.hashTagRepository.save({
                ...hashTag,
                name: data.name || hashTag.name,
                description: data.description || hashTag.description,
                iconImage: data.iconImage || hashTag.iconImage,
                color: data.color || hashTag.color,
                slug: data.slug || hashTag.slug,
            })

            return newHashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update all (PUT)
    async updateAll(hashTagId: number, data: HashTag): Promise<HashTag | null> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    id: hashTagId,
                },
            })
            if (!hashTag) return null

            if (data.name) {
                data.slug = commonService.generateSlug(data.name)
            }

            const newHashTag = await this.hashTagRepository.save({
                ...hashTag,
                ...data,
            })

            return newHashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete (DELETE)
    async delete(id: number): Promise<HashTag | null> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    id,
                },
            })
            if (!hashTag) return null

            await this.hashTagRepository.delete(id)
            return hashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // follow (GET)
    async follow(id: number, hashTagId: number): Promise<HashTag | unknown> {
        try {
            // check id and userId
            const checkHashTags = await this.checkIdAndHashTagId(id, hashTagId)
            if (!checkHashTags)
                throw new Error('Unauthorized or this hash tag is not exits.')
            const { user, hashTag } = checkHashTags

            // check hash tags of user include hash tag id
            // if (!this.checkFollows(user.hashTags, hashTagId))
            //     throw new Error(`'${user.username}' is following '${hashTag.name}'.`)
            // if (!this.checkFollows(hashTag.users, id))
            //     throw new Error(`'${hashTag.name}' has follower '${user.username}'.`)

            const hasHashTag = await user.hashTags?.find((h) => h.id === hashTagId)
            if (!hasHashTag) {
                // add hashTagId into hashTags of User
                user.hashTags?.push(hashTag)
                const newUser = (await userService.updateAll(id, user, true)) as User

                // add id into users of HashTag
                hashTag.users?.push(newUser)
                await this.hashTagRepository.save(hashTag)

                return newUser
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // unfollow (GET)
    async unfollow(id: number, hashTagId: number): Promise<void> {
        try {
            // check id and userId
            const checkHashTags = await this.checkIdAndHashTagId(id, hashTagId)
            if (!checkHashTags)
                throw new Error('Unauthorized or this hash tag is not exits.')
            const { user, hashTag } = checkHashTags

            // check hash tags of user include hash tag id
            // if (!this.checkFollows(user.hashTags, hashTagId))
            //     throw new Error(
            //         `'${user.username}' is not following ${hashTag.name} to unfollow.`
            //     )
            // if (!this.checkFollows(hashTag.users, id))
            //     throw new Error(
            //         `'${hashTag.name}' doesn't have follower '${user.username}'.`
            //     )

            // remove hashTagId into hashTags of User
            const idx = user.hashTags?.findIndex(
                (hashTagFollowed) => hashTagFollowed.id === hashTagId
            )
            if (typeof idx === 'number' && idx >= 0) {
                user.hashTags?.splice(idx, 1)
                await userService.updateAll(id, user, true)
            }

            // remove user id into users of HashTag
            const userHashTagIdx = hashTag.users?.findIndex(
                (userFollow) => userFollow.id === id
            )
            if (typeof userHashTagIdx === 'number' && userHashTagIdx >= 0) {
                hashTag.users?.splice(userHashTagIdx, 1)
                await this.updateAll(hashTag.id, hashTag)
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const hashTagService = new HashTagService()
