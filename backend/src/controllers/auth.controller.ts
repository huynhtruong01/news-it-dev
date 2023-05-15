import { AppDataSource } from '@/config'
import { MAX_AGE_ACCESS_TOKEN } from '@/consts'
import { User } from '@/entities'
import { Results, StatusCode, StatusText } from '@/enums'
import { RequestUser } from '@/models'
import { authService, commonService, userService } from '@/services'
import { Request, Response } from 'express'

class AuthController {
    constructor(private userRepository = AppDataSource.getRepository(User)) {}

    // signup (POST)
    async signup(req: Request, res: Response) {
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

    // login (POST)
    async login(req: Request, res: Response) {
        try {
            console.log(req.body)
            // check email and password
            const { email, password } = req.body
            if (!email || !password) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Missing email or password.',
                })
                return
            }

            // check email has exits
            const user = await authService.getByEmail(email)
            if (!user) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Wrong email.',
                })
                return
            }

            // check compare password
            const checkPassword = await commonService.comparePassword(
                password,
                user.password as string
            )
            if (!checkPassword) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Wrong password.',
                })
                return
            }

            // config password
            user.password = undefined

            // return access and refresh token
            const accessToken = authService.signAccessToken(user.id)
            const refreshToken = authService.signRefreshToken(user.id)

            authService.setCookieToken(
                res,
                process.env.ACCESS_TOKEN_KEY as string,
                accessToken,
                MAX_AGE_ACCESS_TOKEN
            )
            authService.setCookieToken(
                res,
                process.env.REFRESH_TOKEN_KEY as string,
                refreshToken
            )

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    user,
                    accessToken,
                    refreshToken,
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

    // logout (GET)
    async logout(req: Request, res: Response) {
        try {
            const accessToken = req.cookies[process.env.ACCESS_TOKEN_KEY as string]
            const refreshToken = req.cookies[process.env.REFRESH_TOKEN_KEY as string]

            if (accessToken) {
                res.clearCookie(process.env.ACCESS_TOKEN_KEY as string)
            }

            if (refreshToken) {
                res.clearCookie(process.env.REFRESH_TOKEN_KEY as string)
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    message: 'Logout successfully.',
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

    // refresh token (POST)
    async refreshToken(req: Request, res: Response) {
        try {
            // check freshToken
            // const token = req.cookies[process.env.REFRESH_TOKEN_KEY as string]
            const token = req.body.token
            if (!token) {
                res.status(StatusCode.UNAUTHORIZED).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Unauthorized. Login now.',
                })
                return
            }

            // verify refreshToken
            const { id } = authService.verifyToken(token)
            const user = await userService.getById(Number(id))

            // check user
            if (!user) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this user.',
                })
                return
            }

            // generate token: access, refresh; set cookies
            const accessToken = authService.signAccessToken(user.id)
            const refreshToken = authService.signRefreshToken(user.id)

            authService.setCookieToken(
                res,
                process.env.ACCESS_TOKEN_KEY as string,
                accessToken,
                MAX_AGE_ACCESS_TOKEN
            )
            authService.setCookieToken(
                res,
                process.env.REFRESH_TOKEN_KEY as string,
                refreshToken
            )

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    user,
                    accessToken,
                    refreshToken,
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

    // forgot password (POST)
    async resetPassword(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body

            if (password !== confirmPassword) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Password is not equal confirm password.',
                })
                return
            }

            const user = await authService.getByEmail(email)
            if (!user) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: `Not found this user with email ${email}.`,
                })
                return
            }

            const hashPassword = await commonService.hashPassword(password)
            user.password = hashPassword

            const newUser = await userService.update(user.id, user)

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

    // check email (POST)
    async checkEmail(req: Request, res: Response) {
        try {
            const { email } = req.body
            const hasUserByEmail = await authService.checkEmailOrUsername(email)
            if (!hasUserByEmail) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'This user is invalid.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    message: 'Email is valid.',
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

    // delete your self (DELETE)
    async deleteYourSelf(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const user = await userService.delete(Number(req.user.id))
                if (!user) {
                    res.status(StatusCode.NOT_FOUND).json({
                        results: Results.ERROR,
                        status: StatusText.FAILED,
                        message: 'Not found this user to delete your account.',
                    })
                    return
                }

                res.status(StatusCode.DELETED).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: null,
                })
                return
            }
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // verify user (GET)
    async verifyUser(req: RequestUser, res: Response) {
        try {
            const bearer: string = req.headers['authorization'] as string

            if (!bearer) {
                res.status(StatusCode.FORBIDDEN).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: "You don't login.",
                })
                return
            }

            const token = bearer.split(' ')[1]

            // verify token
            const { id } = authService.verifyToken(token)

            // check user
            const user = await userService.getById(Number(id))
            if (!user) {
                res.status(StatusCode.UNAUTHORIZED).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Unauthorized.',
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

    // TODO: change password
}

export const authController = new AuthController()
