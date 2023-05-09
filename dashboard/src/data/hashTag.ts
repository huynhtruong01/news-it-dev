import { IHashTagData, ITableHeader } from '../models'

// export const hashTags: IHashTagTable[] = [
//     {
//         id: 1,
//         name: 'HTML',
//         description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//         createdAt: new Date(),
//     },
//     {
//         id: 2,
//         name: 'CSS',
//         description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//         createdAt: new Date(),
//     },
//     {
//         id: 3,
//         name: 'Javascript',
//         description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//         createdAt: new Date(),
//     },
//     {
//         id: 4,
//         name: 'NodeJS',
//         description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//         createdAt: new Date(),
//     },
//     {
//         id: 5,
//         name: 'ReactJS',
//         description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//         createdAt: new Date(),
//     },
//     {
//         id: 6,
//         name: 'NextJS',
//         description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//         createdAt: new Date(),
//     },
//     {
//         id: 7,
//         name: 'NestJS',
//         description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//         createdAt: new Date(),
//     },
// ]

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
    name: '',
    description: '',
    color: '#fff',
    iconImage: undefined,
}
