import { User } from '@/entities'
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface JwtPayloadUser extends JwtPayload {
    id?: number
}

export interface RequestUser extends Request {
    user?: User
}
