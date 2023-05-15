import { Results, StatusCode } from '@/enums'
import { IObjectCommon, RequestUser } from '@/models'
import { userService, authService } from '@/services'
import { Request, Response } from 'express'
import { StatusText } from '../enums/common.enum'

class UserController {
    async getAllUser(req: RequestUser, res: Response) {
        try {
            const query: IObjectCommon = req.query as IObjectCommon

            const [users, count] = await userService.getAll(query)
            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    users,
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

    // add user (POST)
    async addUser(req: RequestUser, res: Response) {
        try {
            // check email has exits
            const { emailAddress, username } = req.body

            const isEmailExits = await authService.checkEmailOrUsername(emailAddress)
            const isUsernameExits = await authService.checkEmailOrUsername(username)

            // check username has exits
            if (isEmailExits || isUsernameExits) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Email or username already exits.',
                })
                return
            }

            // create user
            const user = await userService.create(req.body)
            user.password = undefined

            res.status(StatusCode.CREATED).json({
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
            console.log(req.body)
            const newUser = await userService.update(Number(req.params.userId), {
                ...req.body,
                id: Number(req.params.userId),
            })

            console.log(newUser)
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

    // TODO: get profile user (GET)
    async getProfile(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const user = await userService.getById(req.user?.id)

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        user,
                    },
                })

                return
            }

            res.status(StatusCode.NOT_FOUND).json({
                results: Results.ERROR,
                status: StatusText.FAILED,
                message: 'Not founded this user.',
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // TODO: update profile user (PUT)
    async updateProfileUser(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const user = await userService.updateProfile(
                    Number(req.user.id),
                    req.body
                )
                if (!user) {
                    res.status(StatusCode.NOT_FOUND).json({
                        results: Results.ERROR,
                        status: StatusText.FAILED,
                        message: 'Not found this user to update profile.',
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
            }
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
