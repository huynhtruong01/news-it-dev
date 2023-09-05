import { AppDataSource } from '@/config'
import { Comment, News, User } from '@/entities'
import { Order } from '@/enums'
import { ICommentRes, IObjectCommon, IOrder } from '@/models'
import { io } from '@/server'
import { newsService, userService } from '@/services'
import { createComment, paginationQuery } from '@/utils'

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
                .leftJoinAndSelect('childrenComments.news', 'newsComment')
                .leftJoinAndSelect('childrenComments.likes', 'likesComment')
                .leftJoinAndSelect('childrenComments.replyUser', 'replyUser')
                .leftJoinAndSelect('comment.news', 'news')
                .leftJoinAndSelect('comment.user', 'user')
                .leftJoinAndSelect('comment.likes', 'likes')
                .orderBy('comment.createdAt', (query.createdAt as IOrder) || Order.DESC)
                .where('comment.parentCommentId IS NULL')

            if (query.newsId) {
                queryBuilder.andWhere('comment.newsId = :newsId', {
                    newsId: query.newsId,
                })
            }

            const [comments, count] = await queryBuilder
                .take(take)
                .skip(skip)
                .getManyAndCount()

            return [comments, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: Comment, user: User, noNotify = false): Promise<Comment> {
        try {
            const comment = createComment(data)

            comment.user = user

            comment.childrenComments = []
            comment.likes = []

            const newComment = await this.commentRepository.save(comment)

            newComment.news = (await newsService.increaseNums(
                data.newsId,
                'numComments'
            )) as News

            if (!noNotify) {
                io.to(newComment.news?.slug).emit('createComment', newComment)
            }

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // reply
    async reply(data: Comment, user: User) {
        try {
            const parentComment = await this.getById(data.parentCommentId as number)
            if (!parentComment) return null

            const replyComment = await this.create(data, user, true)
            if (data.replyUserId) {
                replyComment.replyUser = (await userService.getByIdNoRelations(
                    data.replyUserId
                )) as User
            }

            parentComment.childrenComments?.push(replyComment)
            const newParentComment = await this.commentRepository.save(parentComment)

            io.to(replyComment?.news?.slug as string).emit(
                'replyComment',
                newParentComment
            )
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
    async like(id: number, user: User) {
        try {
            const comment = await this.commentRepository
                .createQueryBuilder('comment')
                .leftJoinAndSelect('comment.likes', 'likes')
                .leftJoinAndSelect('comment.parentComment', 'parentComment')
                .leftJoinAndSelect('comment.news', 'news')
                .where('comment.id = :commentId', { commentId: id })
                .getOne()
            if (!comment) return null
            comment.user = user

            const isIncludesUser = this.checkIncludesUser(comment, user)
            if (isIncludesUser)
                throw new Error(`User ${user.username} liked this comment to like.`)

            comment.likes?.push(user)

            if (comment.parentCommentId) {
                const parentComment = await this.getByIdRelation(comment.parentCommentId)

                if (parentComment) {
                    parentComment.childrenComments = parentComment.childrenComments?.map(
                        (c) => {
                            if (c.id === comment.id) return { ...comment } as Comment
                            return c
                        }
                    )

                    await this.commentRepository.save(parentComment)
                }
            }

            const newComment = await this.commentRepository.save({
                ...comment,
            })
            io.to(comment.news?.slug as string).emit('likeComment', newComment)

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // unlike
    async unlike(id: number, user: User) {
        try {
            const comment = await this.commentRepository
                .createQueryBuilder('comment')
                .leftJoinAndSelect('comment.likes', 'likes')
                .leftJoinAndSelect('comment.parentComment', 'parentComment')
                .leftJoinAndSelect('comment.news', 'news')
                .where('comment.id = :commentId', { commentId: id })
                .getOne()
            if (!comment) return null
            comment.user = user

            const isIncludesUser = this.checkIncludesUser(comment, user)
            if (!isIncludesUser)
                throw new Error(
                    `User ${user.username} didn't like this comment to unlike.`
                )

            comment.likes = comment.likes?.filter((u) => u.id !== user.id)

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

            return newComment
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const commentService = new CommentService()
