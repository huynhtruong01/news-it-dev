import { Results, StatusCode, StatusText } from '@/enums'
import { RequestUser } from '@/models'
import { notifyService } from '@/services'
import { Response } from 'express'

class NotifyController {
    // get all notifies (GET)
    async getAllNotifies(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const notifies = await notifyService.getAll(Number(req.user.id))

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        notifies,
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
