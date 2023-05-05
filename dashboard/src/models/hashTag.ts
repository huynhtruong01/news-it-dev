export interface IHashTagData {
    id?: number
    name: string
    description: string
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
