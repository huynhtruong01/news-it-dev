import { AppDataSource } from '@/config'
import { MAX_AGE_REFRESH_TOKEN } from '@/consts'
import { relationDataUser } from '@/data'
import { User } from '@/entities'
import { JwtPayloadUser } from '@/models'
import { optionCookies } from '@/utils'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

class AuthService {
    constructor(private userRepository = AppDataSource.getRepository(User)) {}

    // check email or username exits
    async checkEmailOrUsername(usernameOrEmail: string): Promise<User | null> {
        try {
            if (!usernameOrEmail) return null

            const emailUser = await this.userRepository.findOne({
                where: {
                    emailAddress: usernameOrEmail,
                },
            })

            const usernameUser = await this.userRepository.findOne({
                where: {
                    username: usernameOrEmail,
                },
            })

            if (usernameUser) return usernameUser
            if (emailUser) return emailUser

            return null
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // check email
    async getByEmail(emailAddress: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    emailAddress,
                },
                relations: relationDataUser,
            })

            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // sign access token
    signAccessToken(id: number) {
        return jwt.sign({ id }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES,
        })
    }

    // sign refresh token
    signRefreshToken(id: number) {
        return jwt.sign({ id }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES,
        })
    }

    // sign active token
    signActiveToken(user: User) {
        return jwt.sign({ newUser: user }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_ACTIVE_EXPIRES,
        })
    }

    // verify token
    verifyToken(token: string): JwtPayloadUser {
        return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadUser
    }

    // set token cookies
    setCookieToken(
        res: Response,
        key: string,
        value: string,
        maxAge: number = MAX_AGE_REFRESH_TOKEN
    ) {
        res.cookie(key, value, {
            ...optionCookies({ maxAge }),
        })
    }

    // TODO: change password
}

export const authService = new AuthService()
