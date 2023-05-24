import { AppDataSource, sendEmail } from '@/config'
import { MAX_AGE_ACCESS_TOKEN } from '@/consts'
import { User } from '@/entities'
import { Results, StatusCode, StatusText } from '@/enums'
import { IFacebookPayload, IGooglePayload, RequestUser } from '@/models'
import { authService, commonService, userService } from '@/services'
import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
const fetch = (...args: Parameters<typeof import('node-fetch')['default']>) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args))

const client = new OAuth2Client(`${process.env.CLIENT_ID}`)
const CLIENT_URL = `${process.env.BASE_URL}`

const loginUser = async (user: User, password: string, res: Response) => {
    try {
        const checkPassword = await commonService.comparePassword(
            password,
            user?.password as string
        )
        if (!checkPassword) {
            res.status(StatusCode.BAD_REQUEST).json({
                results: Results.ERROR,
                status: StatusText.FAILED,
                message: 'Incorrect password.',
            })
            return
        }

        // generate token: access & refresh
        const accessToken = authService.signAccessToken(user.id)
        const refreshToken = authService.signRefreshToken(user.id)

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
        throw new Error(error as string)
    }
}

// register user
const registerUser = async (data: User, res: Response) => {
    try {
        const user = await userService.create(data)

        // generate token: access & refresh
        const accessToken = authService.signAccessToken(user.id)
        const refreshToken = authService.signRefreshToken(user.id)

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
        throw new Error(error as string)
    }
}

class AuthController {
    constructor(private userRepository = AppDataSource.getRepository(User)) {}

    // signup (POST)
    async signup(req: Request, res: Response) {
        try {
            // check email has exits
            const { emailAddress, username } = req.body

            const isEmailExist = await authService.checkEmailOrUsername(emailAddress)
            const isUsernameExist = await authService.checkEmailOrUsername(username)

            // check username has exits
            if (isEmailExist || isUsernameExist) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Email or username already exits.',
                })
                return
            }

            // generate token & send email
            const activeToken = authService.signActiveToken(req.body)
            if (emailAddress) {
                const token = encodeURIComponent(activeToken).replaceAll('.', '_')
                const url = `${process.env.BASE_URL}/active/${token}`
                await sendEmail(emailAddress, url, 'Verify your email address.')
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    message: 'Sign up account success. Please check your email.',
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

    // active token
    async activeUser(req: Request, res: Response) {
        try {
            const { activeToken } = req.body

            const decode = authService.verifyToken(activeToken)

            // console.log(decode)

            if (!decode.newUser) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not valid authentication.',
                })
                return
            }

            // check email & username exist
            const isEmailExist = await authService.checkEmailOrUsername(
                decode.newUser.emailAddress
            )
            const isUsernameExist = await authService.checkEmailOrUsername(
                decode.newUser.username
            )

            if (isEmailExist || isUsernameExist) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Email or username already exits.',
                })
                return
            }

            const user = await userService.create(decode.newUser)
            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    user,
                    message: 'Active user success.',
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
            // check email and password
            const { emailAddress, password } = req.body
            if (!emailAddress || !password) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Missing email or password.',
                })
                return
            }

            // check email has exits
            const user = await authService.getByEmail(emailAddress)
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

    // google login
    async googleLogin(req: Request, res: Response) {
        try {
            const { tokenId } = req.body
            const verify = await client.verifyIdToken({
                idToken: tokenId,
                audience: `${process.env.CLIENT_ID}`,
            })

            const { email, email_verified, name, picture, given_name, family_name } = <
                IGooglePayload
            >verify.getPayload()

            if (!email_verified) {
                res.status(StatusCode.ERROR).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Email verification failed.',
                })
                return
            }

            const password = `${email}`

            const user = await authService.getByEmail(email)

            if (user) {
                await loginUser(user, password, res)
            } else {
                const dataUser = {
                    username: name,
                    avatar: picture,
                    password,
                    roleIds: [2],
                    emailAddress: email,
                    firstName: given_name,
                    lastName: family_name,
                }
                await registerUser(dataUser as User, res)
            }
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // facebook login
    async facebookLogin(req: Request, res: Response) {
        try {
            const { accessToken, userId } = req.body

            const URL = `
                https://graph.facebook.com/v16.0/${userId}/?fields=id,name,email,picture,first_name,last_name&access_token=${accessToken}
            `
            const data: IFacebookPayload = await fetch(URL)
                .then((res) => res.json())
                .then((res) => res as IFacebookPayload)
            const { email, name, picture, first_name, last_name }: IFacebookPayload = data
            const password = email

            const user = await authService.getByEmail(email)

            if (user) {
                loginUser(user, password, res)
            } else {
                const dataUser = {
                    username: name,
                    avatar: picture.data.url,
                    password,
                    roleIds: [2],
                    emailAddress: email,
                    firstName: first_name,
                    lastName: last_name,
                }
                registerUser(dataUser as User, res)
            }
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // github login
    async githubLogin(req: Request, res: Response) {
        try {
            const { code } = req.body
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
