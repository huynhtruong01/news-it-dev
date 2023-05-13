import { INews } from '.'

export interface IHashTagData {
    name: string
    description?: string
    color?: string
    iconImage?: string
    news?: INews[]
    slug?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface IHashTag extends IHashTagData {
    id: number
}

export interface IHashTagFilters {
    createdAt: Date
    search?: string
}
