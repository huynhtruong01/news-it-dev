import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconProps, SvgIconTypeMap } from '@mui/material'
import { Order } from '@/enums'

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
    hashTag?: number
    numLikes?: IOrderReq
    numNews?: IOrderReq
}

export interface IUploadImg {
    public_id: string
    url: string
}
