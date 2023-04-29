import { Results, StatusCode } from '@/enums'
import { RequestUser } from '@/models'
import { userService } from '@/services'
import { Request, Response } from 'express'
import { StatusText } from '../enums/common.enum'

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

    // get user by id (GET)
    async getUser(req: Request, res: Response) {
        try {
            const user = await userService.getById(Number(req.params.userId))
            if (!user) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this user.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    user,
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

    // update user by id (PUT)
    async updateUserById(req: Request, res: Response) {
        try {
            const newUser = await userService.update(Number(req.params.userId), {
                ...req.body,
                id: Number(req.params.userId),
            })
            if (!newUser) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this user to update.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    user: newUser,
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

    // delete user by id (DELETE)
    async deleteUserById(req: Request, res: Response) {
        try {
            const user = await userService.delete(Number(req.params.userId))
            if (!user) {
                res.status(StatusCode.UNAUTHORIZED).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this user to delete.',
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

    // TODO: follow user
    async followUser(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                await userService.follow(req.user.id, Number(req.params.userId))

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        message: 'Follow success.',
                    },
                })
                return
            }

            res.status(StatusCode.BAD_REQUEST).json({
                results: Results.ERROR,
                status: StatusText.FAILED,
                message: 'Follow failed.',
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // TODO: unfollow user
    async unfollowUser(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                await userService.unfollow(req.user.id, Number(req.params.userId))

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        message: 'UnFollow success.',
                    },
                })
                return
            }

            res.status(StatusCode.BAD_REQUEST).json({
                results: Results.ERROR,
                status: StatusText.FAILED,
                message: 'Follow failed.',
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

export const userController = new UserController()
