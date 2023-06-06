import { IHashTagData, ITableHeader } from '../models'

export const tagHeaders: readonly ITableHeader[] = [
    {
        id: 'id',
        label: 'ID',
        isSort: false,
    },
    {
        id: 'iconImage',
        label: 'Icon',
        isSort: false,
    },
    {
        id: 'name',
        label: 'Name',
        isSort: false,
    },
    {
        id: 'description',
        label: 'Description',
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

export const keyInitValues = ['id', 'name', 'description', 'color', 'iconImage']

export const initHashTagFormValues: IHashTagData = {
    id: undefined,
    title: '',
    name: '',
    description: '',
    color: '#fff',
    iconImage: undefined,
}
