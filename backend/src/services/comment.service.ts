import { AppDataSource } from '@/config'
import { relationDataComment } from '@/data'
import { Comment, News, User } from '@/entities'
import { ICommentRes, IObjectCommon } from '@/models'
import { commonService, newsService, userService } from '@/services'
import { createComment, paginationQuery, sortQuery } from '@/utils'
import { io } from 'server'
import { IsNull } from 'typeorm'

class CommentService {
    constructor(
        private commentRepository = AppDataSource.getRepository(Comment) // private userRepository = AppDataSource.getRepository(User)
    ) {}

    // ----------------------- CHECKING -------------------------------
    checkIncludesUser(comment: Comment, user: User): boolean {
        return !!comment.likes?.find((u) => u.id === user.id)
    }

    // --------------------- SERVICES -----------------------------------
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

    // create
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
            newComment.news = (await newsService.getByIdComment(data.newsId)) as News

            io.to(newComment.news?.slug).emit('createComment', newComment)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // reply
    async reply(data: Comment) {
        try {
            const parentComment = await this.getById(data.parentCommentId as number)
            if (!parentComment) return null

            const comment = createComment(data)

            const slug = commonService.generateSlug(comment.comment)
            comment.slug = slug

            comment.childrenComments = []
            comment.likes = []

            // comment.user = (await userService.getByIdComment(data.userId)) as User
            // comment.news = (await newsService.getByIdComment(data.newsId)) as News

            const replyComment = await this.commentRepository.save(comment)
            replyComment.user = (await userService.getByIdComment(data.userId)) as User
            replyComment.news = (await newsService.getByIdComment(data.newsId)) as News

            parentComment.childrenComments?.push(replyComment)

            const newParentComment = await this.commentRepository.save(parentComment)

            io.to(replyComment.news.slug).emit('replyComment', newParentComment)
            return newParentComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id
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

    // get by id with little relation
    async getByIdRelation(id: number): Promise<Comment | null> {
        try {
            const comment = await this.commentRepository.findOne({
                where: {
                    id,
                },
                relations: {
                    childrenComments: true,
                    news: true,
                },
            })
            if (!comment) return null

            return comment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update
    async update(id: number, data: Comment): Promise<Comment | null> {
        try {
            const comment = await this.getById(id)
            if (!comment) return null

            const newComment = await this.commentRepository.save({ ...comment, ...data })
            io.to(newComment.news?.slug as string).emit('updateComment', newComment)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // update reply
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
                io.to(newComment.news?.slug as string).emit(
                    'updateCommentReply',
                    newComment
                )

                return newComment
            }

            return null
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete
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

            io.to(comment.news?.slug as string).emit('deleteComment', comment)
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

            const isIncludesUser = this.checkIncludesUser(comment, user)
            if (isIncludesUser)
                throw new Error(`User ${user.username} liked this comment to like.`)

            const numLikes = (comment.numLikes || 0) + 1
            comment.likes?.push(user)

            if (comment.parentCommentId) {
                const parentComment = await this.getByIdRelation(comment.parentCommentId)

                if (parentComment) {
                    parentComment.childrenComments = parentComment.childrenComments?.map(
                        (c) => {
                            if (c.id === comment.id)
                                return { ...comment, numLikes } as Comment
                            return c
                        }
                    )

                    await this.commentRepository.save(parentComment)
                }
            }

            const newComment = await this.commentRepository.save({
                ...comment,
                numLikes,
            })
            io.to(comment.news?.slug as string).emit('likeComment', newComment)

            user.commentLikes = [...(user.commentLikes || []), newComment]
            await userService.updateAll(userId, user)

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

            const isIncludesUser = this.checkIncludesUser(comment, user)
            if (!isIncludesUser)
                throw new Error(
                    `User ${user.username} didn't like this comment to unlike.`
                )

            comment.numLikes = comment.numLikes === 0 ? 0 : comment.numLikes - 1
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
            io.to(comment.news?.slug as string).emit('unlikeComment', newComment)

            user.commentLikes = user.commentLikes?.filter((c) => c.id !== id)
            await userService.updateAll(userId, user)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const commentService = new CommentService()
