import { AppDataSource } from '@/config'
import { News, User, UserLike, UserSave } from '@/entities'
import { NewsFilters, NewsStatus, Order, Status } from '@/enums'
import { INewsRes, IObjectCommon, IOrder } from '@/models'
import { io } from '@/server'
import { commonService } from '@/services/common.service'
import { hashTagService } from '@/services/hashTag.service'
import {
    createNews,
    createUserLike,
    createUserSave,
    paginationQuery,
    recommenderNews,
} from '@/utils'
import { searchHistoryService, userService } from '.'

class NewsService {
    constructor(
        private newsRepository = AppDataSource.getRepository(News),
        private userRepository = AppDataSource.getRepository(User),
        private userLikeRepository = AppDataSource.getRepository(UserLike),
        private userSaveRepository = AppDataSource.getRepository(UserSave)
    ) {}

    // ------------------- CHECK ------------------------
    checkUserExitsInLikes(likes: User[] = [], userId: number) {
        const newLikeUserIds: number[] = likes.map((like: User) => like.id)
        return newLikeUserIds.includes(userId)
    }

    checkUserExitsInSaves(saves: User[] = [], userId: number) {
        const newLikeUserIds: number[] = saves.map((like: User) => like.id)
        return newLikeUserIds.includes(userId)
    }

    async getAllByConditional(query: IObjectCommon, userId?: number): Promise<INewsRes> {
        try {
            const pagination = paginationQuery(query)
            const user = (await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.newsLikes', 'likes')
                .leftJoinAndSelect('user.saves', 'saves')
                .where('user.id = :userId', {
                    userId,
                })
                .getOne()) as User
            const likes = user
                ? (user.newsLikes?.map((u) => {
                      if (u.newsId) return u.newsId
                      return 0
                  }) as number[])
                : []
            const saves = user
                ? (user.saves?.map((u) => {
                      if (u.newsId) return u.newsId
                      return 0
                  }) as number[])
                : []
            const excludeIds = Array.from(new Set([...likes, ...saves]))

            if (query.hashTag || query.type === NewsFilters.RELEVANT) {
                const hashTagIds = query.hashTag
                    ? (query.hashTag as string).split(',').map((h) => Number(h))
                    : []
                const queryBuilder = this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.hashTags', 'hashTag')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.comments', 'comments')
                    .leftJoinAndSelect('news.saveUsers', 'saves')

                if (excludeIds.length > 0) {
                    queryBuilder.where('news.id NOT IN (:...excludeIds)', {
                        excludeIds,
                    })
                }

                if (hashTagIds.length > 0) {
                    queryBuilder.andWhere('hashTag.id IN (:...hashTagIds)', {
                        hashTagIds,
                    })
                }

                const [news, count] = await queryBuilder
                    .andWhere('news.status = :status', {
                        status: NewsStatus.PUBLIC,
                    })
                    .take(pagination.take)
                    .skip(pagination.skip)
                    .getManyAndCount()

                return [news, count]
            }

            if (query.search && (query.search as string).split(' ').length > 0) {
                const conditions = (query.search as string)
                    .split(' ')
                    .filter((k) => !!k)
                    .map((k) => k.toLowerCase().split(' ').join('_'))

                const queryBuilder = this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.hashTags', 'hashTag')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.comments', 'comments')
                    .leftJoinAndSelect('news.saveUsers', 'saves')
                    .where('news.status = :status', {
                        status: NewsStatus.PUBLIC,
                    })

                if (excludeIds.length > 0) {
                    queryBuilder.andWhere('news.id NOT IN (:...excludeIds)', {
                        excludeIds,
                    })
                }

                if (query.numLikes) {
                    queryBuilder.orderBy('news.numLikes', Status.DESC)
                } else {
                    queryBuilder.orderBy('news.createdAt', Status.DESC)
                }

                const [news, count] = await queryBuilder
                    .andWhere(
                        conditions
                            .map((keyword) => {
                                return `LOWER(news.title) LIKE :${keyword}`
                            })
                            .join(' OR '),
                        conditions.reduce((params, keyword) => {
                            return {
                                ...params,
                                [keyword]: `%${keyword.split('_').join(' ')}%`,
                            }
                        }, {})
                    )
                    .orderBy('news.numLikes', Order.DESC)
                    .skip(pagination.skip)
                    .take(pagination.take)
                    .getManyAndCount()

                return [news, count]
            }

            // const [news, count] = await this.getAll(query)
            const queryBuilder = this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.user', 'user')
                .leftJoinAndSelect('news.hashTags', 'hashTag')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('news.comments', 'comments')
                .leftJoinAndSelect('news.saveUsers', 'saves')
                .where('news.status = :status', {
                    status: NewsStatus.PUBLIC,
                })

            if (excludeIds.length > 0) {
                queryBuilder.andWhere('news.id NOT IN (:...excludeIds)', {
                    excludeIds,
                })
            }

            if (query.numLikes) {
                queryBuilder.orderBy('news.numLikes', Order.DESC)
            } else {
                queryBuilder.orderBy('news.createdAt', Order.DESC)
            }

            const [news, count] = await queryBuilder
                .take(pagination.take)
                .skip(pagination.skip)
                .getManyAndCount()

            return [news, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // search by queries
    async getAllBySearchQueries(userId: number) {
        try {
            const searchHistories = await searchHistoryService.getAllByUserId(
                Number(userId)
            )
            const getSearchQueries = searchHistories.map((s) => s.searchQuery)
            const conditions = getSearchQueries.map((k) =>
                k.toLowerCase().split(' ').join('_')
            )
            const [news, count] = await this.newsRepository
                .createQueryBuilder('news')
                .where(
                    conditions
                        .map((keyword) => {
                            return `LOWER(news.title) LIKE :${keyword}`
                        })
                        .join(' OR '),
                    conditions.reduce((params, keyword) => {
                        return {
                            ...params,
                            [keyword]: `%${keyword.split('_').join(' ')}%`,
                        }
                    }, {})
                )
                .getManyAndCount()

            return [news, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // check image
    checkImage(thumbnailImage?: string, coverImage?: string) {
        if (!thumbnailImage) throw new Error('Missing thumbnail image.')
        if (!coverImage) throw new Error('Missing cover image.')
    }

    // get all
    async getAll(query: IObjectCommon): Promise<INewsRes> {
        try {
            const { take, skip } = paginationQuery(query)

            const conditionsSearch = ((query.search as string) || '')
                .split(' ')
                .filter((k) => !!k)
                .map((k) => k.toLowerCase())

            const queryBuilder = this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('news.saveUsers', 'saves')
                .leftJoinAndSelect('news.user', 'user')
                .leftJoinAndSelect('user.news', 'userNews')
                .leftJoinAndSelect('userNews.hashTags', 'newsHashTags')
                .leftJoinAndSelect('user.followers', 'userFollowers')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .leftJoinAndSelect('news.reporterNews', 'reportNews')
                .leftJoinAndSelect('reportNews.reporter', 'reporter')
                .take(take)
                .skip(skip)
                .orderBy('news.createdAt', (query.createdAt as IOrder) || Order.DESC)

            if (query?.readTimes) {
                queryBuilder.orderBy('news.readTimes', query.readTimes as IOrder)
            }

            if (query?.numLikes) {
                queryBuilder.orderBy('news.numLikes', query.numLikes as IOrder)
            }

            if (query?.newsViews) {
                queryBuilder.orderBy('news.newsViews', query.newsViews as IOrder)
            }

            if (query?.search) {
                queryBuilder.andWhere(
                    conditionsSearch
                        .map((keyword) => {
                            return `LOWER(news.title) LIKE :${keyword}`
                        })
                        .join(' OR '),
                    conditionsSearch.reduce((params, keyword) => {
                        return { ...params, [keyword]: `%${keyword}%` }
                    }, {})
                )
            }

            if (query.hashTag) {
                queryBuilder.andWhere(
                    'FIND_IN_SET(:hashTag, CAST(news.hashTagIds AS CHAR)) > 0',
                    {
                        hashTag: query.hashTag.toString(),
                    }
                )
            }

            if (query.status) {
                queryBuilder.andWhere('news.status = :status', {
                    status: query.status,
                })
            }

            const [news, count] = await queryBuilder.getManyAndCount()

            return [news, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get news by recommend
    async getAllByRecommend(query: IObjectCommon): Promise<News[]> {
        try {
            const hashTagIds = (query.hashTag as string)?.split(',')
            const news = await this.newsRepository.findOne({
                where: {
                    id: query.newsId as number,
                },
            })
            const newsList = await this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .where('news.id != :newsId', { newsId: query.newsId })
                .andWhere('hashTags.id IN (:...hashTagIds)', { hashTagIds })
                .orderBy('news.createdAt', Order.DESC)
                .getMany()

            const newNews = recommenderNews(news?.title as string, newsList)
                .filter((n) => n.similarity >= 0.55)
                .map((n) => n.news)

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: News): Promise<News> {
        try {
            const news = createNews(data)

            // add hash tags array
            if (data.hashTagIds?.length > 0) {
                news.hashTags = await hashTagService.getAllByIds(data.hashTagIds)
            } else {
                news.hashTags = []
            }

            // create slug
            news.slug = commonService.generateSlug(news.title)

            const newNews = await this.newsRepository.save(news)
            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by :id
    async getById(id: number): Promise<News | null> {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('news.saveUsers', 'saves')
                .leftJoinAndSelect('news.user', 'user')
                .leftJoinAndSelect('user.news', 'newsUser')
                .leftJoinAndSelect('user.followers', 'followers')
                .leftJoinAndSelect('newsUser.hashTags', 'hashTagsNewsUser')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .leftJoinAndSelect('news.comments', 'comments')
                .where('news.id = :newsId', { newsId: id })
                .getOne()
            if (!news) return null

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id news into comment
    async getByIdComment(id: number) {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.user', 'user')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .where('news.id = :newsId', { newsId: id })
                .getOne()
            if (!news) return null

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id no relations
    async getByIdNoRelations(id: number) {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.user', 'user')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .where('news.id = :newsId', { newsId: id })
                .getOne()
            if (!news) return null

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by :slug
    async getBySlug(slug: string): Promise<News | null> {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('news.saveUsers', 'saves')
                .leftJoinAndSelect('news.user', 'user')
                .leftJoinAndSelect('user.news', 'newsUser')
                .leftJoinAndSelect('user.followers', 'followers')
                .leftJoinAndSelect('newsUser.hashTags', 'hashTagsNewsUser')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .leftJoinAndSelect('news.comments', 'comments')
                .where('news.slug = :slug', { slug })
                .getOne()
            if (!news) return null

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update
    async update(id: number, data: News): Promise<News | null> {
        try {
            // check news exits
            const news = await this.newsRepository.findOne({
                where: {
                    id,
                },
            })
            if (!news) return null

            // update hash tags array
            if (data.hashTagIds?.length > 0) {
                news.hashTags = await hashTagService.getAllByIds(data.hashTagIds)
            } else {
                news.hashTags = []
            }

            // generate new slug
            if (data.title !== news.title) {
                data.slug = commonService.generateSlug(data.title)
            }

            // check both thumnail image and cover image is empty
            // this.checkImage(data.thumbnailImage, data.coverImage)

            const newNews = await this.newsRepository.save({
                ...news,
                title: data.title || news.title,
                sapo: data.sapo || news.sapo,
                content: data.content || news.content,
                newsViews: data.newsViews || news.newsViews,
                status: data.status || news.status,
                thumbnailImage: data.thumbnailImage || news.thumbnailImage,
                coverImage: data.coverImage || news.coverImage,
                readTimes: data.readTimes || news.readTimes,
                hashTagIds: data.hashTagIds.length ? data.hashTagIds : [],
                slug: data.slug || news.slug,
            })

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // increase nums
    async increaseNums(id: number, key: string) {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .where('news.id = :newsId', {
                    newsId: id,
                })
                .getOne()
            if (news) {
                const nums = news[key as keyof typeof news] as number
                return await this.newsRepository.save({ ...news, [key]: nums + 1 })
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update all
    async updateAll(id: number, data: News, notCheck = false): Promise<News | null> {
        try {
            // check news exits
            const news = await this.newsRepository.findOne({
                where: {
                    id,
                },
            })
            if (!news) return null

            // generate new slug
            if (data.title !== news.title) {
                data.slug = commonService.generateSlug(data.title)
            }

            // check both thumnail image and cover image is empty
            if (!notCheck) {
                this.checkImage(data.thumbnailImage, data.coverImage)
            }

            const newNews = await this.newsRepository.save({
                ...news,
                ...data,
            })

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete
    async delete(id: number, userId: number): Promise<News | null> {
        try {
            const news = await this.newsRepository.findOne({
                where: {
                    id,
                },
            })
            const user = await userService.getByIdNoRelations(userId)
            if (!news || !user) return null

            await this.newsRepository.delete(id)

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // count viewer of news
    async countViews(id: number): Promise<News> {
        try {
            const news = await this.getById(id)
            if (news?.id) {
                news.newsViews = news.newsViews + 1
                const newNews = await this.update(id, news)

                if (newNews) return newNews
            }

            throw new Error('Not found this news to count views.')
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // like news
    async like(newsId: number, user: User): Promise<News | null> {
        try {
            const news = (await this.getByIdNoRelations(newsId)) as News
            const existingUserLike = await this.userLikeRepository.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    news: {
                        id: news.id,
                    },
                },
            })

            if (existingUserLike) {
                throw new Error(`user ${user.username} liked this news`)
            }
            const data = {
                userId: user.id,
                newsId: news.id,
                user,
                news,
            }

            const userLike = createUserLike(data)
            await this.userLikeRepository.save(userLike)
            const newNews = (await this.getById(newsId)) as News

            io.to(news?.slug as string).emit('likeNews', newNews)
            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // dislike news
    async unlike(newsId: number, user: User): Promise<News | null> {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .where('news.id = :newsId', { newsId })
                .getOne()
            if (!news) throw new Error('Not found this news to unlike.')

            const userLike = await this.userLikeRepository.findOne({
                where: { user: { id: user.id }, news: { id: newsId } },
            })

            if (!userLike) {
                throw new Error(`user ${user.username} doesn't like this news`)
            }

            await userLike.remove()

            const newNews = (await this.getById(newsId)) as News
            io.to(newNews?.slug as string).emit('unlikeNews', newNews)
            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // save
    async save(newsId: number, user: User): Promise<News | null> {
        try {
            const news = (await this.getByIdNoRelations(newsId)) as News
            const existingUserSave = await this.userSaveRepository.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    news: {
                        id: news.id,
                    },
                },
            })
            if (existingUserSave) {
                throw new Error(`user ${user.username} saved this news`)
            }
            const data = {
                userId: user.id,
                newsId: news.id,
                user,
                news,
            }

            const userLike = createUserSave(data)
            await this.userSaveRepository.save(userLike)
            const newNews = (await this.getById(newsId)) as News

            io.to(newNews?.slug as string).emit('saveNews', newNews)
            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // unsave
    async unsave(newsId: number, user: User): Promise<News | null> {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .where('news.id = :newsId', { newsId })
                .getOne()
            if (!news) throw new Error('Not found this news to unlike.')

            const userSave = await this.userSaveRepository.findOne({
                where: { user: { id: user.id }, news: { id: newsId } },
            })

            if (!userSave) {
                throw new Error(`user ${user.username} doesn't save this news`)
            }

            await userSave.remove()

            const newNews = (await this.getById(newsId)) as News
            io.to(newNews?.slug as string).emit('unsaveNews', newNews)
            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const newsService = new NewsService()
