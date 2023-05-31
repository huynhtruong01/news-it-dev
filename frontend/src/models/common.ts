import { IRole } from './../../../dashboard/src/models/role'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconProps, SvgIconTypeMap } from '@mui/material'
import { IsFollow, Order, Status } from '@/enums'
import { IHashTag, INews, IUser } from '.'

export type IIcon = OverridableComponent<SvgIconTypeMap<SvgIconProps, 'svg'>> & {
    muiName?: string
}

export interface IObjectCommon {
    [k: string]: string | number
}

export interface IOptionItem {
    id: number
    name: number | string
}

export type IDebounceCallback =
    | ((value: string) => (value: string) => void)
    | ((value: string) => void)

export type IOrderReq = Order.ASC | Order.DESC

export interface IFilters {
    limit: number
    page: number
    isActive?: boolean
    isAdmin?: boolean
    search?: string
    createdAt?: IOrderReq
    status?: string
    hashTag?: number | string
    numLikes?: IOrderReq
    numNews?: IOrderReq
    hashTagIds?: string
    newsId?: number
    isRead?: number
}

export interface ISelectValue {
    name: string
    value: any
}

export interface IUploadImg {
    public_id: string
    url: string
}

export type IFollow = IsFollow.FOLLOW | IsFollow.FOLLOWING

export type ISynthetic = INews | IHashTag | IUser | IRole

export type IImgType = string | File

export type IStatus = Status.DRAFT | Status.PUBLIC | Status.UNPUBLIC

export interface ISettingSetPassword {
    currentPassword: string
    password: string
    confirmPassword: string
}
