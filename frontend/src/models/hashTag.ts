export interface IHashTagData {
    name: string
    description?: string
    color?: string
    iconImage?: string
    slug?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface IHashTag extends IHashTagData {
    id: number
}
