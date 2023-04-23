import { StatusText } from '../enums/common.enum'
import { Results, StatusCode } from '@/enums'
import { RequestUser } from '@/models'
import { userService } from '@/services'
import { Response } from 'express'

class UserController {
    async getAllUser(req: RequestUser, res: Response) {
        try {
            const users = await userService.getAll()
            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    users,
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

    async deleteUser(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const user = await userService.delete(Number(req.user.id))
                if (!user) {
                    res.status(StatusCode.UNAUTHORIZED).json({
                        results: Results.ERROR,
                        status: StatusText.FAILED,
                        message: 'Not found this user.',
                    })
                    return
                }

                res.status(StatusCode.DELETED).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: null,
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
}

export const userController = new UserController()
