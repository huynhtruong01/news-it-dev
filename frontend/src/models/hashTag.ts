import { INews, IObjectCommon } from '.'

export interface IHashTagData {
    id?: number
    name: string
    description?: string
    color?: string
    iconImage?: string
    news?: INews[]
    slug?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface IHashTag extends Omit<IHashTagData, 'id'> {
    id: number
}

export interface IHashTagRes {
    hashTags: IHashTag[]
    total: number
}
