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
        align: 'left',
    },
    {
        id: 'name',
        label: 'Name',
        isSort: false,
        align: 'left',
    },
    {
        id: 'description',
        label: 'Description',
        isSort: false,
        align: 'left',
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

export const keyInitValues = ['id', 'title', 'name', 'description', 'color', 'iconImage']

export const initHashTagFormValues: IHashTagData = {
    id: undefined,
    title: '',
    name: '',
    description: '',
    color: '#fff',
    iconImage: undefined,
}
