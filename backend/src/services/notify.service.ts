import { AppDataSource } from '@/config'
import { relationDataNotify } from '@/data'
import { Notify } from '@/entities'
import { Order } from '@/enums'
import { INotifyData, IObjectCommon } from '@/models'
import { createNotify, paginationQuery } from '@/utils'

class NotifyService {
    constructor(private notifyRepository = AppDataSource.getRepository(Notify)) {}

    // get all
    async getAll(userId: number, query: IObjectCommon) {
        try {
            const pagination = paginationQuery(query)

            const [notifications, count] = await this.notifyRepository
                .createQueryBuilder('notify')
                .leftJoinAndSelect('notify.user', 'user')
                .leftJoinAndSelect('notify.news', 'news')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .leftJoinAndSelect('news.saveUsers', 'saveUsers')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('notify.recipients', 'recipients')
                .where('recipients.id = :userId', { userId })
                .andWhere(
                    'notify.newsId IS NULL OR news.id IS NULL OR news.id IS NOT NULL'
                )
                .andWhere('LOWER(news.title) LIKE LOWER(:search)', {
                    search: `%${query.search || ''}%`,
                })
                .orderBy('notify.createdAt', Order.DESC)
                .take(pagination.take)
                .skip(pagination.skip)
                .getManyAndCount()

            let newNotifications = [...notifications]
            let newCount = count
            if (query.isRead) {
                newNotifications = newNotifications.filter((n) =>
                    Number(query.isRead) === 0
                        ? !n.readUsers?.includes(userId.toString() as string)
                        : n.readUsers?.includes(userId.toString() as string)
                )
            }

            if (newNotifications.length === 0) newCount = 0

            return [newNotifications, newCount]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: INotifyData) {
        try {
            const notify = createNotify(data)
            if (data.user) {
                notify.user = data.user
            }

            notify.news = data.news ? data.news : null
            const newNotify = await this.notifyRepository.save(notify)

            return newNotify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by newsId
    async getByNewsId(newsId: number): Promise<Notify | null> {
        try {
            const notify = await this.notifyRepository.findOne({
                where: {
                    newsId,
                },
            })

            if (!notify) return null

            return notify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id
    async getById(id: number) {
        try {
            const notify = await this.notifyRepository.findOne({
                where: {
                    id,
                },
                relations: relationDataNotify,
            })

            if (!notify) return null

            return notify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // push id read users
    async readUsers(id: number, userId: number) {
        try {
            const notify = await this.getById(id)
            if (!notify) return null

            notify.readUsers?.push(userId)
            const newNotify = await this.notifyRepository.save({ ...notify })
            return newNotify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete by newsId
    async delete(newsId: number) {
        try {
            const notify = await this.getByNewsId(newsId)
            if (!notify) return null

            await this.notifyRepository.delete({ newsId })

            return notify
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const notifyService = new NotifyService()
