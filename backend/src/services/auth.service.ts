import { AppDataSource } from '@/config'
import { User } from '@/entities'
import { JwtPayloadUser } from '@/models'
import jwt from 'jsonwebtoken'

class AuthService {
    constructor(private userRepository = AppDataSource.getRepository(User)) {}

    // check email or username exits
    async checkEmail(usernameOrEmail: string): Promise<boolean> {
        try {
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

            if (usernameUser || emailUser) return true

            return false
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

    // verify token
    verifyToken(token: string): JwtPayloadUser {
        return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadUser
    }
}

export const authService = new AuthService()
