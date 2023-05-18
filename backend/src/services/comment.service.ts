import { AppDataSource } from '@/config'
import { Comment, News, User } from '@/entities'
import { ICommentRes, IObjectCommon } from '@/models'
import { createComment, paginationQuery, sortQuery } from '@/utils'
import { commonService, newsService, userService } from '@/services'
import { relationDataComment } from '@/data'

class CommentService {
    constructor(private commentRepository = AppDataSource.getRepository(Comment)) {}

    async getAll(query: IObjectCommon): Promise<ICommentRes> {
        try {
            const newSortQuery = sortQuery(query)
            const newPaginationQuery = paginationQuery(query)

            const [comments, count] = await this.commentRepository.findAndCount({
                where: {
                    newsId: query.newsId as number,
                },
                order: {
                    ...newSortQuery,
                },
                ...newPaginationQuery,
                relations: relationDataComment,
            })

            return [comments, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getId(id: number): Promise<Comment | null> {
        try {
            const comment = await this.commentRepository.findOne({
                where: {
                    id,
                },
                relations: relationDataComment,
            })

            if (!comment) return null

            return comment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: Comment): Promise<Comment> {
        try {
            const comment = createComment(data)

            // create slug
            const slug = commonService.generateSlug(comment.comment)
            comment.slug = slug

            // add user, news
            comment.user = (await userService.getByIdComment(data.userId)) as User
            comment.news = (await newsService.getByIdComment(data.newsId)) as News

            comment.childrenComments = []

            const newComment = await this.commentRepository.save(comment)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async reply(data: Comment) {
        try {
            const parentComment = await this.getById(data.parentCommentId as number)
            if (!parentComment) return null

            const comment = createComment(data)

            comment.user = (await userService.getByIdComment(data.userId)) as User
            comment.news = (await newsService.getByIdComment(data.newsId)) as News

            parentComment.childrenComments?.push(comment)

            const newParentComment = await this.commentRepository.save(parentComment)
            return newParentComment
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
                relations: relationDataComment,
            })
            if (!comment) return null

            return comment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update(id: number, data: Comment): Promise<Comment | null> {
        try {
            const comment = await this.getById(id)
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
