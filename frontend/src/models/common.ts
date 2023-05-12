import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconProps, SvgIconTypeMap } from '@mui/material'

export type IIcon = OverridableComponent<SvgIconTypeMap<SvgIconProps, 'svg'>> & {
    muiName?: string
}

export interface IObjectCommon {
    [k: string]: string | number
}

export interface IOptionItem {
    name: string
    value: number | string
}
