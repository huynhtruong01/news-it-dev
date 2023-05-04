import { IRoleData, IRoleTable, ITableHeader } from '../models'

export const roles: IRoleTable[] = [
    {
        id: 1,
        name: 'Admin',
        createdAt: new Date(),
    },
    {
        id: 2,
        name: 'User',
        createdAt: new Date(),
    },
]

export const roleHeaders: readonly ITableHeader[] = [
    {
        id: 'id',
        label: 'ID',
        isSort: false,
    },
    {
        id: 'name',
        label: 'Name',
        isSort: false,
    },
    {
        id: 'createdAt',
        label: 'Date Created',
        isSort: true,
    },
    {
        id: '',
        label: 'Actions',
    },
]

export const initRoleFormValues: IRoleData = {
    name: '',
}
