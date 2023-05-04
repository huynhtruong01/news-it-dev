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

export interface IFilters {
    limit: number
    page: number
}

export type IDebounceCallback =
    | ((value: string) => (value: string) => void)
    | ((value: string) => void)

export interface ITableHeader {
    id: string
    label: string
    isSort?: boolean
}

export type IOrder = Order.ASC | Order.DESC
