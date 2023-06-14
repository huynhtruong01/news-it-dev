import { IRoleData, ITableHeader } from '../models'

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
        id: 'color',
        label: 'Color',
        isSort: false,
    },
    {
        id: 'createdAt',
        label: 'Created',
        isSort: true,
    },
    {
        id: '',
        label: 'Actions',
        isSort: false,
    },
]

export const initRoleFormValues: IRoleData = {
    id: undefined,
    name: '',
    color: '#fff',
    description: '',
}

export const keyRoleInitValues = ['id', 'name', 'color', 'description']
