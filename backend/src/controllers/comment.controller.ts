import { User } from '@/entities'
import { Results, StatusCode, StatusText } from '@/enums'
import { IObjectCommon, RequestUser } from '@/models'
import { commentService } from '@/services'
import { Response } from 'express'

class CommentController {
    // get all comments (GET)
    async getAllComments(req: RequestUser, res: Response) {
        try {
            const [comments, total] = await commentService.getAll(
                req.query as IObjectCommon
            )

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    comments,
                    total,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // create comment (POST)
    async createComment(req: RequestUser, res: Response) {
        try {
            const comment = await commentService.create(req.body, req?.user as User)

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    comment,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    async replyComment(req: RequestUser, res: Response) {
        try {
            const comment = await commentService.reply(req.body, req.user as User)

            if (!comment) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found comment to reply.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    comment,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // update comment (PUT)
    async updateComment(req: RequestUser, res: Response) {
        try {
            const comment = await commentService.update(
                Number(req.params.commentId),
                req.body
            )

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    comment,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    async updateReplyComment(req: RequestUser, res: Response) {
        try {
            const comment = await commentService.updateReply(
                Number(req.params.commentId),
                req.body
            )

            if (!comment) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found comment to update reply.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    comment,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // delete comment (DELETE)
    async deleteComment(req: RequestUser, res: Response) {
        try {
            const comment = await commentService.getById(Number(req.params.commentId))
            if (!comment) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found comment to delete.',
                })
                return
            }

            await commentService.delete(comment.id)

            res.status(StatusCode.DELETED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: null,
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // like comment (GET)
    async likeComment(req: RequestUser, res: Response) {
        try {
            const comment = await commentService.like(
                Number(req.params.commentId),
                req.user as User
            )

            if (!comment) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found comment to like.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    message: 'Like comment success.',
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // unlike comment (GET)
    async unlikeComment(req: RequestUser, res: Response) {
        try {
            const comment = await commentService.unlike(
                Number(req.params.commentId),
                req.user as User
            )

            if (!comment) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found comment to unlike.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    message: 'Unlike comment success.',
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }
}

export const commentController = new CommentController()
