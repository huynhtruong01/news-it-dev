import { AppDataSource } from '@/config'
import { Comment } from '@/entities'
import { createComment } from '@/utils'

class CommentService {
    constructor(private commentRepository = AppDataSource.getRepository(Comment)) {}

    async getAll(): Promise<Comment[]> {
        try {
            const comments = await this.commentRepository.find()

            return comments
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: Comment): Promise<Comment> {
        try {
            const comment = createComment(data)

            // TODO: create slug

            const newComment = await this.commentRepository.save(comment)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getById(id: number): Promise<Comment | null> {
        try {
            const comment = await this.commentRepository.findOne({
                where: {
                    id,
                },
            })
            if (!comment) return null

            return comment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update(data: Comment): Promise<Comment | null> {
        try {
            const comment = await this.commentRepository.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!comment) return null

            const newComment = await this.commentRepository.save({ ...comment, ...data })

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<void | null> {
        try {
            const comment = await this.commentRepository.findOne({
                where: {
                    id,
                },
            })
            if (!comment) return null

            await this.commentRepository.delete(id)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const commentService = new CommentService()
