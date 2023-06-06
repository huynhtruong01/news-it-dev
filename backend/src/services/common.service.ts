import { AppDataSource } from '@/config'
import { HashTag, News, Role, User } from '@/entities'
import bcrypt from 'bcrypt'
import slugify from 'slugify'

class CommonService {
    constructor(
        private userRepository = AppDataSource.getRepository(User),
        private newsRepository = AppDataSource.getRepository(News),
        private hashTagRepository = AppDataSource.getRepository(HashTag),
        private roleRepository = AppDataSource.getRepository(Role)
    ) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(Number(process.env.SECRET_PASSWORD))
        return await bcrypt.hash(password, salt)
    }

    async comparePassword(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword)
    }

    generateSlug(data: string, options?: any) {
        return slugify(`${data} ${Date.now()}`, {
            replacement: '-',
            lower: true,
            locale: 'vi',
            trim: true,
            strict: true,
            ...options,
        })
    }

    async statisticalDashboard() {
        try {
            const userCount = await this.userRepository
                .createQueryBuilder('user')
                .getCount()

            const roleCount = await this.roleRepository
                .createQueryBuilder('role')
                .getCount()

            const hashTagCount = await this.hashTagRepository
                .createQueryBuilder('hashTag')
                .getCount()

            const newsCount = await this.newsRepository
                .createQueryBuilder('news')
                .getCount()

            const newsLikesCount = await this.newsRepository
                .createQueryBuilder('news')
                .select('SUM(news.numLikes) AS numLikes')
                .getRawOne()

            return {
                numUser: userCount,
                numRole: roleCount,
                numHashTag: hashTagCount,
                numNews: newsCount,
                numLikes: parseInt(newsLikesCount.numLikes),
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const commonService = new CommonService()
