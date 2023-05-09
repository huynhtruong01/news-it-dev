import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Order } from '../enums'
import { SvgIconProps, SvgIconTypeMap } from '@mui/material'

export interface INavbar {
    name: string
    link: string
    icon: OverridableComponent<SvgIconTypeMap<SvgIconProps, 'svg'>> & {
        muiName?: string
    }
}

export interface ISelectValue {
    name: string
    value: any
}

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
}

export type IDebounceCallback =
    | ((value: string) => (value: string) => void)
    | ((value: string) => void)

export interface ITableHeader {
    id: string
    label: string
    isSort: boolean
    align?: string
}

export type IOrder = Order.asc | Order.desc

export interface IObjectQuery {
    [k: string]: string | number | undefined
}

export interface IOptionItem {
    id: number
    name: string
}

export interface IUploadImg {
    public_id: string
    url: string
}

export type IImgType = string | File
