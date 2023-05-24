import { AppDataSource } from '@/config'
import { Notify } from '@/entities'
import { Order } from '@/enums'
import { createNotify } from '@/utils'

class NotifyService {
    constructor(private notifyRepository = AppDataSource.getRepository(Notify)) {}

    // get all
    async getAll(userId: number) {
        try {
            const notifications = await this.notifyRepository
                .createQueryBuilder('notify')
                .leftJoinAndSelect('notify.user', 'user')
                .leftJoinAndSelect('notify.news', 'news')
                .leftJoinAndSelect('news.hashTags', 'hashTags')
                .leftJoinAndSelect('notify.recipients', 'recipients')
                .where('recipients.id = :userId', { userId })
                .orderBy('notify.createdAt', Order.DESC)
                .getMany()

            return notifications
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: Notify) {
        try {
            const notify = createNotify(data)
            if (data.user) {
                notify.user = data.user
            }
            if (data.news) {
                notify.news = data.news
            }

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
