import { FindOperator } from 'typeorm'

export interface IObjectCommon {
    [k: string]:
        | string
        | number
        | boolean
        | FindOperator<string>
        | readonly string[]
        | number[]
}
