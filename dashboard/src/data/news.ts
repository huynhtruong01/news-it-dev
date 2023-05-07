import { Status } from '../enums'
import { INewsData, INewsTable, ITableHeader, ISelectValue, IOptionItem } from '../models'

export const news: INewsTable[] = [
    {
        id: 1,
        title: 'How to learn English?',
        sapo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        newsViews: 23,
        status: Status.DRAFT,
        likes: 12,
        coverImage: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        user: 'Huynh Truong',
        hashTags: ['HTML', 'CSS', 'Javascript'],
        readTimes: 6,
        createdAt: new Date(),
    },
    {
        id: 2,
        title: 'Making Website Portfolio with me.',
        sapo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        newsViews: 21,
        status: Status.DRAFT,
        likes: 15,
        coverImage: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        user: 'Huynh Truong',
        hashTags: ['HTML', 'CSS', 'Javascript'],
        readTimes: 5,
        createdAt: new Date(),
    },
    {
        id: 3,
        title: 'Learning HTML in an hour.',
        sapo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        newsViews: 65,
        status: Status.DRAFT,
        likes: 45,
        coverImage: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        user: 'Huynh Truong',
        hashTags: ['HTML', 'CSS', 'Javascript'],
        readTimes: 7,
        createdAt: new Date(),
    },
    {
        id: 4,
        title: 'Make website by ReactJS',
        sapo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        newsViews: 23,
        status: Status.DRAFT,
        likes: 12,
        coverImage: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        user: 'Huynh Truong',
        hashTags: ['HTML', 'CSS', 'Javascript'],
        readTimes: 6,
        createdAt: new Date(),
    },
]

export const newsHeaders: readonly ITableHeader[] = [
    {
        id: 'id',
        label: 'ID',
        isSort: false,
    },
    {
        id: 'coverImage',
        label: 'Image',
        isSort: false,
    },
    {
        id: 'title',
        label: 'Title',
        isSort: false,
    },
    {
        id: 'sapo',
        label: 'Sapo',
        isSort: false,
    },
    {
        id: 'newsViews',
        label: 'Views',
        isSort: true,
    },
    {
        id: 'likes',
        label: 'Likes',
        isSort: true,
    },
    {
        id: 'readTimes',
        label: 'Read Times',
        isSort: true,
    },
    {
        id: 'hashTags',
        label: 'Tags',
        isSort: false,
    },
    {
        id: 'status',
        label: 'Status',
        isSort: false,
    },
    {
        id: 'createdAt',
        label: 'Created',
        isSort: false,
    },
    {
        id: '',
        label: 'Actions',
        isSort: false,
    },
]

export const initNewsFormValues: INewsData = {
    title: '',
    sapo: '',
    content: '',
    status: Status.DRAFT,
    coverImage: '',
    hashTags: ['HTML', 'CSS', 'Javascript'],
    readTimes: 1,
    hashTagOptionIds: [],
}

export const selectStatus: ISelectValue[] = [
    {
        name: Status.DRAFT,
        value: Status.DRAFT,
    },
    {
        name: Status.PUBLIC,
        value: Status.PUBLIC,
    },
    {
        name: Status.UNPUBLIC,
        value: Status.UNPUBLIC,
    },
]

export const selectTags: ISelectValue[] = [
    {
        name: 'HTML',
        value: 1,
    },
    {
        name: 'CSS',
        value: 2,
    },
    {
        name: 'Javascript',
        value: 3,
    },
]

export const hashTagOptions: IOptionItem[] = [
    {
        id: 1,
        name: 'HTML',
    },
    {
        id: 2,
        name: 'CSS',
    },
    {
        id: 3,
        name: 'Javascript',
    },
]
