import { INews } from '.'

export interface IHashTagData {
    id?: number
    title: string
    name: string
    description?: string
    color?: string
    iconImage?: string
    news?: INews[]
    numUsers: number
    numNews: number
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
