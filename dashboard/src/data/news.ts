import { Status } from '../enums'
import { INewsData, ISelectValue, ITableHeader } from '../models'

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
        align: 'left',
    },
    {
        id: 'title',
        label: 'Title',
        isSort: false,
        align: 'left',
    },
    {
        id: 'sapo',
        label: 'Sapo',
        isSort: false,
        align: 'left',
    },
    {
        id: 'newsViews',
        label: 'Views',
        isSort: true,
    },
    {
        id: 'numLikes',
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
        isSort: true,
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
    coverImage: undefined,
    thumbnailImage: undefined,
    hashTags: [],
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

export const keyNewsInitValues = [
    'id',
    'title',
    'sapo',
    'content',
    'coverImage',
    'thumbnailImage',
    'readTimes',
    'hashTags',
    'status',
    'hashTagOptionIds',
]
