import { IImgType } from './common'

export interface IHashTagData {
    id?: number
    title: string
    name: string
    description: string
    color: string
    iconImage?: IImgType
}

export interface IHashTagTable extends IHashTagData {
    createdAt: Date
}

export interface IHashTag extends IHashTagData {
    createdAt: Date
}

export interface IHashTagRes {
    hashTags: IHashTag[]
    total: number
}
