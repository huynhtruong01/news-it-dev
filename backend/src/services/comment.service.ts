import { AppDataSource } from '@/config'
import { Comment, News, User } from '@/entities'
import { Order } from '@/enums'
import { ICommentRes, IObjectCommon, IOrder } from '@/models'
import { commonService, newsService, notifyService, userService } from '@/services'
import { createComment, paginationQuery } from '@/utils'
import { io } from 'server'

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
            const { take, skip } = paginationQuery(query)

            const queryBuilder = this.commentRepository
                .createQueryBuilder('comment')
                .leftJoinAndSelect('comment.parentComment', 'parentComment')
                .leftJoinAndSelect('comment.childrenComments', 'childrenComments')
                .leftJoinAndSelect('childrenComments.user', 'userComment')
                .leftJoinAndSelect('childrenComments.likes', 'likesComment')
                .leftJoinAndSelect('childrenComments.replyUser', 'replyUser')
                .leftJoinAndSelect('comment.news', 'news')
                .leftJoinAndSelect('comment.user', 'user')
                .leftJoinAndSelect('comment.likes', 'likes')
                .take(take)
                .skip(skip)
                .orderBy('comment.createdAt', (query.createdAt as IOrder) || Order.DESC)
                .where('comment.parentCommentId IS NULL')

            if (query.newsId) {
                queryBuilder.andWhere('comment.newsId = :newsId', {
                    newsId: query.newsId,
                })
            }

            const [comments, count] = await queryBuilder.getManyAndCount()

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

            const notify = {
                userId: newComment.user.id,
                newsId: newComment.news.id,
                user: newComment.user,
                news: newComment.news,
                text: 'has been commented your news',
                recipients: [newComment.news.user],
                readUsers: [],
            }
            const newNotify = await notifyService.create(notify)
            io.to(newComment.news.user.id.toString()).emit('notifyNews', newNotify)

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

            const replyComment = await this.commentRepository.save(comment)
            replyComment.user = (await userService.getByIdComment(data.userId)) as User
            replyComment.news = (await newsService.getByIdComment(data.newsId)) as News

            if (data.replyUserId) {
                replyComment.replyUser = (await userService.getByIdComment(
                    data.replyUserId
                )) as User
            }

            parentComment.childrenComments
                ?.sort((a, b) => b.id - a.id)
                ?.unshift(replyComment)

            const newParentComment = await this.commentRepository.save(parentComment)

            if (
                replyComment.replyUserId &&
                replyComment.replyUser &&
                replyComment.userId !== replyComment.replyUserId
            ) {
                const notify = {
                    userId: replyComment.user.id,
                    newsId: replyComment.news.id,
                    user: replyComment.user,
                    news: replyComment.news,
                    recipients: [replyComment.replyUser],
                    readUsers: [],
                }

                const newNotify = await notifyService.create({
                    ...notify,
                    text: 'reply to your comment',
                })
                io.to(replyComment.replyUserId.toString()).emit('notifyNews', newNotify)
            }

            io.to(replyComment.news.slug).emit('replyComment', newParentComment)
            return newParentComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id
    async getById(id: number): Promise<Comment | null> {
        try {
            const comment = await this.commentRepository
                .createQueryBuilder('comment')
                .leftJoinAndSelect('comment.parentComment', 'parentComment')
                .leftJoinAndSelect('comment.childrenComments', 'childrenComments')
                .leftJoinAndSelect('childrenComments.user', 'userComment')
                .leftJoinAndSelect('childrenComments.likes', 'likesComment')
                .leftJoinAndSelect('childrenComments.replyUser', 'replyUser')
                .leftJoinAndSelect('comment.news', 'news')
                .leftJoinAndSelect('comment.user', 'user')
                .leftJoinAndSelect('comment.likes', 'likes')
                .where('comment.id = :commentId', { commentId: id })
                .getOne()
            if (!comment) return null

            return comment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by id with little relation
    async getByIdRelation(id: number): Promise<Comment | null> {
        try {
            const comment = await this.commentRepository
                .createQueryBuilder('comment')
                .leftJoinAndSelect('comment.childrenComments', 'childrenComments')
                .leftJoinAndSelect('comment.news', 'news')
                .where('comment.id = :commentId', { commentId: id })
                .getOne()
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
