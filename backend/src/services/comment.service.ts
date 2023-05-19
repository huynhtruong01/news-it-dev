import { AppDataSource } from '@/config'
import { relationDataComment } from '@/data'
import { Comment, User } from '@/entities'
import { ICommentRes, IObjectCommon } from '@/models'
import { commonService, userService } from '@/services'
import { createComment, paginationQuery, sortQuery } from '@/utils'
import { IsNull } from 'typeorm'

class CommentService {
    constructor(
        private commentRepository = AppDataSource.getRepository(Comment),
        private userRepository = AppDataSource.getRepository(User)
    ) {}

    async getAll(query: IObjectCommon): Promise<ICommentRes> {
        try {
            const newSortQuery = sortQuery(query)
            const newPaginationQuery = paginationQuery(query)

            const [comments, count] = await this.commentRepository.findAndCount({
                where: {
                    newsId: query.newsId as number,
                    parentCommentId: IsNull(),
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

    async create(data: Comment): Promise<Comment> {
        try {
            const comment = createComment(data)

            // create slug
            const slug = commonService.generateSlug(comment.comment)
            comment.slug = slug

            comment.childrenComments = []
            comment.likes = []

            const newComment = await this.commentRepository.save(comment)
            newComment.user = (await userService.getByIdComment(data.userId)) as User

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

            // comment.user = (await userService.getByIdComment(data.userId)) as User
            // comment.news = (await newsService.getByIdComment(data.newsId)) as News

            const replyComment = await this.commentRepository.save(comment)
            replyComment.user = (await userService.getByIdComment(data.userId)) as User

            parentComment.childrenComments?.push(replyComment)

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

    async getByIdRelation(id: number): Promise<Comment | null> {
        try {
            const comment = await this.commentRepository.findOne({
                where: {
                    id,
                },
                relations: {
                    childrenComments: true,
                },
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

    async updateReply(id: number, data: Comment): Promise<Comment | null> {
        try {
            if (id) {
                const comment = await this.getById(id)
                if (!comment) return null

                const index = (comment.childrenComments as Comment[]).findIndex(
                    (c) => c.id === data.id
                ) as number
                if (index > -1) {
                    ;(comment.childrenComments as Comment[])[index] = data
                    await this.commentRepository.save(data)
                }

                const newComment = await this.commentRepository.save(comment)

                return newComment
            }

            return null
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<void | null> {
        try {
            const comment = await this.getByIdRelation(id)
            if (!comment) return null

            if (comment.parentCommentId) {
                const parentComment = await this.getByIdRelation(comment.parentCommentId)

                if (parentComment) {
                    const newChildrenComments = parentComment.childrenComments?.filter(
                        (c) => c.id !== comment.id
                    )
                    parentComment.childrenComments = newChildrenComments

                    await this.commentRepository.save(parentComment)
                }
            }

            await this.commentRepository.delete(id)
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // like
    async like(id: number, userId: number) {
        try {
            const comment = await this.getById(id)
            if (!comment) return null

            const user = await userService.getById(userId)
            if (!user) return null

            comment.numLikes = comment.numLikes + 1
            comment.likes?.push(user)

            if (comment.parentCommentId) {
                const parentComment = await this.getByIdRelation(comment.parentCommentId)

                if (parentComment) {
                    parentComment.childrenComments = parentComment.childrenComments?.map(
                        (c) => {
                            if (c.id === comment.id) return comment
                            return c
                        }
                    )

                    await this.commentRepository.save(parentComment)
                }
            }

            const newComment = await this.commentRepository.save(comment)
            user.commentLikes?.push(newComment)
            await this.userRepository.save(user)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // unlike
    async unlike(id: number, userId: number) {
        try {
            const comment = await this.getById(id)
            if (!comment) return null

            const user = await userService.getById(userId)
            if (!user) return null

            comment.numLikes = comment.numLikes - 1
            comment.likes = comment.likes?.filter((u) => u.id !== userId)

            if (comment.parentCommentId) {
                const parentComment = await this.getByIdRelation(comment.parentCommentId)

                if (parentComment) {
                    parentComment.childrenComments = parentComment.childrenComments?.map(
                        (c) => {
                            if (c.id === comment.id) return comment
                            return c
                        }
                    )

                    await this.commentRepository.save(parentComment)
                }
            }

            const newComment = await this.commentRepository.save(comment)
            user.commentLikes?.filter((c) => c.id !== newComment.id)
            await this.userRepository.save(user)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const commentService = new CommentService()
