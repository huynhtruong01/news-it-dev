import { AppDataSource } from '@/config'
import { HashTag } from '@/entities'
import { createHashTag } from '@/utils'

class HashTagService {
    constructor(private hashTagRepository = AppDataSource.getRepository(HashTag)) {}

    async getAll(): Promise<HashTag[]> {
        try {
            const hashTags = await this.hashTagRepository.find()

            return hashTags
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: HashTag): Promise<HashTag> {
        try {
            const hashTag = createHashTag(data)

            // TODO: create slug

            const newHashTag = await this.hashTagRepository.save(hashTag)

            return newHashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getById(id: number): Promise<HashTag | null> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    id,
                },
            })
            if (!hashTag) return null

            return hashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update(data: HashTag): Promise<HashTag | null> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!hashTag) return null

            const newHashTag = await this.hashTagRepository.save({ ...hashTag, ...data })

            return newHashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<void | null> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    id,
                },
            })
            if (!hashTag) return null

            await this.hashTagRepository.delete(id)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const hashTagService = new HashTagService()
