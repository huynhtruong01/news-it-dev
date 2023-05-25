import { Results, StatusCode, StatusText } from '@/enums'
import { IObjectCommon, RequestUser } from '@/models'
import { notifyService } from '@/services'
import { Response } from 'express'

class NotifyController {
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

    // delete by news id (DELETE)
    async deleteNotifyByNewsId(req: RequestUser, res: Response) {
        try {
            const notify = await notifyService.delete(Number(req.params.newsId))
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
