import { AppDataSource } from '@/config'
import { News } from '@/entities'
import { createNews } from '@/utils'

class NewsService {
    constructor(private newsRepository = AppDataSource.getRepository(News)) {}

    async getAll(): Promise<News[]> {
        try {
            const news = await this.newsRepository.find()

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: News): Promise<News> {
        try {
            const news = createNews(data)

            // TODO: create slug

            const newNews = await this.newsRepository.save(news)

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getById(id: number): Promise<News | null> {
        try {
            const news = await this.newsRepository.findOne({
                where: {
                    id,
                },
            })
            if (!news) return null

            return news
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update(data: News): Promise<News | null> {
        try {
            const news = await this.newsRepository.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!news) return null

            const newNews = await this.newsRepository.save({ ...news, ...data })

            return newNews
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<void | null> {
        try {
            const news = await this.newsRepository.findOne({
                where: {
                    id,
                },
            })
            if (!news) return null

            await this.newsRepository.delete(id)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const newsService = new NewsService()
