import { Results, StatusCode, StatusText } from '@/enums'
import { IObjectCommon, RequestUser } from '@/models'
import { newsService, notifyService } from '@/services'
import { Response } from 'express'
import { io } from 'server'

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
}

export const notifyController = new NotifyController()
