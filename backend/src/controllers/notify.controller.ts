import { NewsStatus, NotifyType, Results, StatusCode, StatusText } from '@/enums'
import { IObjectCommon, RequestUser } from '@/models'
import { newsService, notifyService, userService } from '@/services'
import { Response } from 'express'
import { io } from '@/server'
import { News, User, UserFollow } from '@/entities'
import { sendEmail } from '@/config'

class NotifyController {
    // get all no conditions (GET)
    async getAllNotifiesNoConditions(req: RequestUser, res: Response) {
        try {
            const [notifies, count] = await notifyService.getAllNoConditions()

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    notifies,
                    total: count,
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

    // get all notifies (GET)
    async getAllNotifies(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const [notifies, count] = await notifyService.getAll(
                    Number(req.user.id),
                    req.query as IObjectCommon
                )

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        notifies,
                        total: count,
                    },
                })
            }
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // create notify (POST)
    async createNotify(req: RequestUser, res: Response) {
        try {
            const notify = await notifyService.create(req.body)

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    notify,
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

    // create multi notify in comment mentions
    async createNotifyForComment(req: RequestUser, res: Response) {
        try {
            const notify = await notifyService.createMultiForComment(
                req.body,
                req.body.users
            )

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    notify,
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

    // notify new news
    async newNewsNotify(req: RequestUser, res: Response) {
        try {
            const { notify, news } = req.body
            const user = (await userService.getById(Number(notify.userId))) as User

            if (
                news.status === NewsStatus.PUBLIC &&
                (user.followers as UserFollow[]).length > 0
            ) {
                const newNotify = await notifyService.create(req.body.notify)
                if (newNotify) {
                    for (const u of (user.followers as UserFollow[]) || []) {
                        io.to(u.id.toString()).emit('notifyNews', newNotify)
                    }
                }

                const emails = user.followers?.map((u: any) => u.emailAddress)
                const url = `${process.env.HOST_FRONTEND}/news/${news.slug}`
                await sendEmail(
                    emails as string[],
                    url,
                    'Đọc bài viết mới',
                    `Bạn đã có bài viết đến từ ${newNotify.user?.username}. Hãy nhấn nút bên dưới hoặc nhấn đường link để xem bài viết`
                )
            }

            res.status(StatusCode.DELETED).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
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

    // create comment notify
    async createCommentNotify(req: RequestUser, res: Response) {
        try {
            const notify = {
                userId: req.user?.id as number,
                newsId: req.body.news.id,
                user: req.user as User,
                news: req.body.news as News,
                text: 'has been commented your news',
                recipients: [req.body.news.user],
                readUsers: [],
                type: NotifyType.COMMENT,
            }
            const newNotify = await notifyService.create(notify)
            io.to(req.body.news.user.id.toString()).emit('notifyNews', newNotify)
            res.status(StatusCode.DELETED).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
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

    // like news notify
    async likeNewsNotify(req: RequestUser, res: Response) {
        try {
            const notify = await notifyService.create(req.body)

            const news = await newsService.getByIdComment(req.body.newsId)
            if (news) {
                notify.news = news
            }

            for (const user of req.body.recipients) {
                io.to(user.id.toString()).emit('notifyNews', notify)
            }

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    notify,
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

    // follow
    async followNews(req: RequestUser, res: Response) {
        try {
            const notify = await notifyService.create(req.body)

            for (const user of req.body.recipients) {
                io.to(user.id.toString()).emit('notifyNews', notify)
            }

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    notify,
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

    // update read users (GET)
    async readUsersNotify(req: RequestUser, res: Response) {
        try {
            const notify = await notifyService.readUsers(
                Number(req.params.notifyId),
                Number(req.user?.id)
            )

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    notify,
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

    // reply comment
    async replyCommentNotify(req: RequestUser, res: Response) {
        try {
            const news = await newsService.getByIdComment(Number(req.body.newsId))
            req.body.news = news
            const notify = await notifyService.create(req.body)

            for (const user of req.body.recipients) {
                io.to(user.id.toString()).emit('notifyNews', notify)
            }

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    notify,
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

    // delete by news id (DELETE)
    async deleteNotifyByNewsId(req: RequestUser, res: Response) {
        try {
            const notify = await notifyService.delete(
                Number(req.params.notifyId),
                Number(req.user?.id)
            )
            if (!notify) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found notify by news id to delete.',
                })
                return
            }

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

    async deleteAllNotify(req: RequestUser, res: Response) {
        try {
            await notifyService.deleteAll(req.user?.id as number)
            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    message: 'Delete many notify success',
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

export const notifyController = new NotifyController()
