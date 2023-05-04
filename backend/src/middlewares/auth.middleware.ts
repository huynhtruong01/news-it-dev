import { Results, StatusCode, StatusText } from '@/enums'
import { RequestUser } from '@/models'
import { authService, userService } from '@/services'
import { NextFunction, Response } from 'express'

class AuthMiddleware {
    async getUser(req: RequestUser, res: Response, next: NextFunction) {
        try {
            // get token
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

            if (!token) {
                res.status(StatusCode.FORBIDDEN).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: "You don't login.",
                })
                return
            }

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

            // next
            req.user = user
            next()
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }
}

export const authMiddleware = new AuthMiddleware()
