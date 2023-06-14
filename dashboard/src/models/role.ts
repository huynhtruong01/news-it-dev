export interface IRoleData {
    id?: number
    name: string
    color: string
    description: string
}

export interface IRoleTable extends IRoleData {
    createdAt: Date
}

export interface IRole extends IRoleData {
    createdAt: Date
}

export interface IRoleRes {
    roles: IRole[]
    total: number
}
