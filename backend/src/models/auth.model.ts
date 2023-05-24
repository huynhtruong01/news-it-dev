import { User } from '@/entities'
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface JwtPayloadUser extends JwtPayload {
    id?: number
}

export interface RequestUser extends Request {
    user?: User
}

export interface IGooglePayload {
    email: string
    email_verified: boolean
    name: string
    picture: string
    given_name: string // first name
    family_name: string // last name
}

export interface IFacebookPayload {
    email: string
    name: string
    picture: any
    first_name: string
    last_name: string
}
