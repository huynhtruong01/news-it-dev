import { AppDataSource } from '@/config'
import { HashTag } from '@/entities'
import { createHashTag } from '@/utils'
import { commonService } from './common.service'

class HashTagService {
    constructor(private hashTagRepository = AppDataSource.getRepository(HashTag)) {}

    // check name hash tag exits?
    async checkNameHashTag(name: string): Promise<boolean> {
        try {
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    name,
                },
            })

            if (hashTag) return true

            return false
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

    async getAll(): Promise<HashTag[]> {
        try {
            const hashTags = await this.hashTagRepository.find({
                relations: {
                    news: true,
                    users: true,
                },
            })

            return hashTags
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
            const hashTag = await this.hashTagRepository.findOne({
                where: {
                    id,
                },
                relations: {
                    users: true,
                    news: true,
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

            if (data.name) {
                data.slug = commonService.generateSlug(data.name)
            }

            const newHashTag = await this.hashTagRepository.save({
                ...hashTag,
                name: data.name || hashTag.name,
                description: data.description || hashTag.description,
                slug: data.slug || hashTag.slug,
            })

            return newHashTag
        } catch (error) {
            throw new Error(error as string)
        }
    }

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
}

export const hashTagService = new HashTagService()
