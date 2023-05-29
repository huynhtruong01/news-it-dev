import { AppDataSource } from '@/config'
import { relationNewsData } from '@/data'
import { News, User } from '@/entities'
import { NewsStatus, Order } from '@/enums'
import { INewsRes, IObjectCommon, IOrder } from '@/models'
import { commonService } from '@/services/common.service'
import { hashTagService } from '@/services/hashTag.service'
import {
    createNews,
    filtersArrQuery,
    filtersQuery,
    paginationQuery,
    searchQuery,
    sortQuery,
} from '@/utils'
import { io } from 'server'
import { userService, notifyService } from '.'

class NewsService {
    constructor(private newsRepository = AppDataSource.getRepository(News)) {}

    // ------------------- CHECK ------------------------
    checkUserExitsInLikes(likes: User[] = [], userId: number) {
        const newLikeUserIds: number[] = likes.map((like: User) => like.id)
        return newLikeUserIds.includes(userId)
    }

    checkUserExitsInSaves(saves: User[] = [], userId: number) {
        const newLikeUserIds: number[] = saves.map((like: User) => like.id)
        return newLikeUserIds.includes(userId)
    }

    async getAllByConditional(query: IObjectCommon): Promise<INewsRes> {
        try {
            const pagination = paginationQuery(query)

            if (query.hashTag) {
                const hashTagIds = (query.hashTag as string).split(',')
                const [news, count] = await this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.hashTags', 'hashTag')
                    .where('news.status = :status', { status: NewsStatus.PUBLIC })
                    .andWhere('hashTag.id IN (:...hashTagIds)', {
                        hashTagIds,
                    })
                    .orderBy('news.createdAt', Order.DESC)
                    .skip(pagination.skip)
                    .take(pagination.take)
                    .getManyAndCount()

                return [news, count]
            }

            if (query.search && (query.search as string).split(' ').length >= 2) {
                const conditions = (query.search as string)
                    .split(' ')
                    .map((k) => k.toLowerCase())

                const [news, count] = await this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.hashTags', 'hashTag')
                    .where('news.status = :status', { status: NewsStatus.PUBLIC })
                    .andWhere(
                        conditions
                            .map((keyword) => {
                                return `LOWER(news.title) LIKE :${keyword}`
                            })
                            .join(' OR '),
                        conditions.reduce((params, keyword) => {
                            return { ...params, [keyword]: `%${keyword}%` }
                        }, {})
                    )
                    .orderBy('news.createdAt', Order.DESC)
                    .skip(pagination.skip)
                    .take(pagination.take)
                    .getManyAndCount()

                return [news, count]
            }

            const newFiltersQuery = filtersQuery(query)
            const newSortQuery = sortQuery(query)
            const titleSearchQuery = searchQuery(query, 'title')

            const [news, count] = await this.newsRepository.findAndCount({
                order: {
                    ...newSortQuery,
                },
                where: {
                    ...titleSearchQuery,
                    ...newFiltersQuery,
                    status: NewsStatus.PUBLIC,
                },
                ...pagination,
                relations: relationNewsData,
            })

            return [news, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    checkImage(thumbnailImage?: string, coverImage?: string) {
        if (!thumbnailImage) throw new Error('Missing thumbnail image.')
        if (!coverImage) throw new Error('Missing cover image.')
    }

    // QUERY
    async getAll(query: IObjectCommon): Promise<INewsRes> {
        try {
            const newFiltersQuery = filtersQuery(query)
            const newSortQuery = sortQuery(query)
            const newPaginationQuery = paginationQuery(query)
            const titleSearchQuery = searchQuery(query, 'title')
            const newFilterArrQuery = filtersArrQuery(query)

            const [news, count] = await this.newsRepository.findAndCount({
                order: {
                    ...newSortQuery,
                },
                where: {
                    ...titleSearchQuery,
                    ...newFiltersQuery,
                    ...newFilterArrQuery,
                },
                ...newPaginationQuery,
                relations: relationNewsData,
            })

            return [news, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get news by hash tag ids
    async getAllByTagIds(query: IObjectCommon): Promise<News[]> {
        try {
            const news = await this.newsRepository
                .createQueryBuilder('news')
                .leftJoinAndSelect('news.hashTags', 'hashTag')
                .where('hashTag.id IN (:...hashTagIds)')
                .andWhere('news.status = :status', { status: query.status })
                .orderBy('news.createdAt', query.createdAt as IOrder)
                .setParameter('hashTagIds', query.hashTagIds as number[])
                .skip((+query.page - 1) * +query.limit)
                .take(+query.limit)
                .getMany()

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: News): Promise<News> {
        try {
            const news = createNews(data)

            // add hash tags array
            news.hashTags = await hashTagService.getAllByIds(data.hashTagIds)

            // create slug
            news.slug = commonService.generateSlug(news.title)
            const user = await userService.getById(data.userId)

            if (user) {
                await userService.updateAll(user.id, user)
            }

            const newNews = await this.newsRepository.save(news)
            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by :id
    async getById(id: number): Promise<News | null> {
        try {
            const news = await this.newsRepository.findOne({
                where: {
                    id,
                },
                relations: relationNewsData,
            })
            if (!news) return null

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id news into comment
    async getByIdComment(id: number) {
        try {
            const news = await this.newsRepository.findOne({
                where: {
                    id,
                },
                relations: {
                    hashTags: true,
                    user: true,
                },
            })
            if (!news) return null

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by :slug
    async getBySlug(slug: string): Promise<News | null> {
        try {
            const news = await this.newsRepository.findOne({
                where: {
                    slug,
                },
                relations: relationNewsData,
            })
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

            // generate new slug
            if (data.title) {
                data.slug = commonService.generateSlug(data.title)
            }

            // check both thumnail image and cover image is empty
            this.checkImage(data.thumbnailImage, data.coverImage)

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
                slug: data.slug || news.slug,
            })

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update all
    async updateAll(id: number, data: News): Promise<News | null> {
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
            this.checkImage(data.thumbnailImage, data.coverImage)

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
            const user = await userService.getById(userId)
            if (!news || !user) return null

            user.newsCount = user.newsCount - 1
            await userService.updateAll(userId, user)
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
            const news = await this.getById(newsId)
            if (!news) throw new Error('Not found this news to like.')

            // check user liked
            if (this.checkUserExitsInLikes(news.likes, user.id))
                throw new Error(`User '${user.username}' liked to '${news.title}' news.`)

            // add user into likes
            news.likes?.push(user)
            news.numLikes++

            const newNews = await this.updateAll(newsId, news)

            io.to(newNews?.slug as string).emit('likeNews', newNews)

            const notify = {
                userId: user.id,
                newsId: news.id,
                user,
                news,
                text: 'liked your news',
                recipients: [news.user],
                readUsers: [],
            }
            const newNotify = await notifyService.create(notify)
            io.to(news.user.id.toString()).emit('notifyNews', newNotify)

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // dislike news
    async dislike(newsId: number, user: User): Promise<News | null> {
        try {
            const news = await this.getById(newsId)
            if (!news) throw new Error('Not found this news to unlike.')

            const idx = news.likes?.findIndex((user) => user.id === user.id)
            if (typeof idx === 'number' && idx >= 0) {
                news.likes?.splice(idx, 1)
                news.numLikes--
                if (news.numLikes < 0) news.numLikes = 0

                const newNews = await this.updateAll(newsId, news)

                io.to(newNews?.slug as string).emit('unlikeNews', newNews)
                return newNews
            }

            throw new Error(`User '${user.username}' doesn't like.`)
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // save
    async save(newsId: number, user: User): Promise<News | null> {
        try {
            const news = await this.getById(newsId)
            if (!news) throw new Error('Not found this news to save.')

            if (this.checkUserExitsInSaves(news.saveUsers, user.id))
                throw new Error(`'${news.title}' has been exits in your saves.`)

            news.saveUsers?.push(user)
            news.numSaves++

            const newNews = await this.updateAll(newsId, news)
            io.to(newNews?.slug as string).emit('saveNews', newNews)

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // unsave
    async unsave(newsId: number, user: User): Promise<News | null> {
        try {
            const news = await this.getById(newsId)
            if (!news) throw new Error('Not found this news to save.')

            if (!this.checkUserExitsInSaves(news.saveUsers, user.id))
                throw new Error(`'${news.title}' news doesn't save.`)

            const idx = news.saveUsers?.findIndex((userSave) => userSave.id === user.id)
            if (typeof idx === 'number' && idx >= 0) {
                news.saveUsers?.splice(idx, 1)
                if (news.numSaves > 0) news.numSaves--

                const newNews = await this.updateAll(newsId, news)
                io.to(newNews?.slug as string).emit('unsaveNews', newNews)
                return newNews
            }

            throw new Error(`Not found '${user.username}' to unsave.`)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const newsService = new NewsService()
