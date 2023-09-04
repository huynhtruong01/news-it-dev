import { AppDataSource } from '@/config'
import { relationDataNotify } from '@/data'
import { Notify } from '@/entities'
import { Order } from '@/enums'
import { INotifyData, IObjectCommon } from '@/models'
import { userService } from '@/services'
import { createNotify, paginationQuery } from '@/utils'
import { io } from '@/server'

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
                .where((qb) => {
                    qb.where('notify.newsId IS NULL AND recipients.id = :userId', {
                        userId,
                    }).orWhere('notify.newsId IS NOT NULL AND recipients.id = :userId', {
                        userId,
                    })
                })
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

    // get all no conditions
    async getAllNoConditions() {
        try {
            const [notifies, count] = await this.notifyRepository.findAndCount({
                relations: relationDataNotify,
                order: {
                    createdAt: Order.DESC,
                },
            })

            return [notifies, count]
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

    // create multiple for comment
    async createMultiForComment(data: INotifyData, users: string[]) {
        try {
            const recipients = []
            for (const username of users) {
                const user = await userService.getByUsername(username, true)
                if (user) {
                    recipients.push(user)
                }
            }

            const notify = createNotify({
                ...data,
                recipients,
            })

            if (data.news) {
                notify.news = data.news
            }

            if (data.user) {
                notify.user = data.user
            }

            const newNotify = await this.notifyRepository.save(notify)
            for (const user of recipients) {
                io.to(user.id.toString()).emit('notifyNews', newNotify)
            }

            return newNotify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by newsId
    async getByUserId(id: number): Promise<Notify | null> {
        try {
            const notify = await this.notifyRepository
                .createQueryBuilder('notify')
                .leftJoinAndSelect('notify.recipients', 'recipients')
                .where('notify.id = :notifyId', {
                    notifyId: id,
                })
                .getOne()

            if (!notify) return null

            return notify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id
    async getById(id: number) {
        try {
            const notify = await this.notifyRepository
                .createQueryBuilder('notify')
                .leftJoinAndSelect('notify.user', 'user')
                .leftJoinAndSelect('notify.news', 'news')
                .leftJoinAndSelect('news.saveUsers', 'saves')
                .leftJoinAndSelect('news.likes', 'likes')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .leftJoinAndSelect('notify.recipients', 'recipients')
                .where('notify.id = :notifyId', {
                    notifyId: id,
                })
                .getOne()

            if (!notify) return null

            return notify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id no relation
    async getByIdNoRelations(id: number) {
        try {
            const notify = await this.notifyRepository
                .createQueryBuilder('notify')
                .where('notify.id = :notifyId', { notifyId: id })
                .getOne()

            if (!notify) return null

            return notify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // push id read users
    async readUsers(id: number, userId: number) {
        try {
            const notify = await this.getByIdNoRelations(id)

            if (!notify) return null

            notify.readUsers?.push(userId)
            const newNotify = await this.notifyRepository.save({ ...notify })
            return newNotify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete by newsId
    async delete(id: number, userId: number) {
        try {
            const notify = await this.notifyRepository
                .createQueryBuilder('notify')
                .leftJoinAndSelect('notify.recipients', 'recipients')
                .where('notify.id = :notifyId', { notifyId: id })
                .getOne()
            if (!notify) return null

            const indexRead = notify.readUsers?.findIndex(
                (n) => Number(n) === userId
            ) as number
            if (indexRead > -1) notify.readUsers?.splice(indexRead, 1)

            const indexRecipients = notify.recipients?.findIndex(
                (n) => Number(n.id) === userId
            ) as number
            if (indexRecipients > -1) notify.recipients?.splice(indexRecipients, 1)

            await this.notifyRepository.save({ ...notify })
            return notify
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete by userId
    async deleteAll(userId: number) {
        try {
            const notifies = await this.notifyRepository
                .createQueryBuilder('notify')
                .leftJoinAndSelect('notify.recipients', 'recipients')
                .where('recipients.id = :userId', { userId })
                .getMany()
            const newNotifies = notifies.map((notify) => {
                const newRecipients = notify?.recipients?.filter((u) => u.id !== userId)
                notify.recipients = newRecipients
                return notify
            })

            await this.notifyRepository.save(newNotifies)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const notifyService = new NotifyService()
