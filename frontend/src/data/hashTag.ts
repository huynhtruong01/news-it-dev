import { IHashTag, IOptionItem } from '@/models'
import { AVATAR, IMAGE } from '.'

export const tags: IOptionItem[] = [
    {
        name: 'html',
        value: 1,
    },
    {
        name: 'css',
        value: 2,
    },
    {
        name: 'javascript',
        value: 3,
    },
    {
        name: 'reactjs',
        value: 4,
    },
    {
        name: 'devops',
        value: 5,
    },
    {
        name: 'beginner',
        value: 6,
    },
    {
        name: 'python',
        value: 7,
    },
    {
        name: 'webdev',
        value: 8,
    },
    {
        name: 'typescript',
        value: 9,
    },
    {
        name: 'nodejs',
        value: 10,
    },
]

export const tagList: IHashTag[] = [
    {
        id: 1,
        name: 'html',
        color: '#008335',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
    {
        id: 2,
        name: 'css',
        color: '#ED1556',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
    {
        id: 3,
        name: 'javascript',
        color: '#3b49df',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
    {
        id: 4,
        name: 'python',
        color: '#ebdf37',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
]

export const tag: IHashTag = {
    id: 1,
    name: 'html',
    color: '#008335',
    description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    news: [
        {
            id: 4,
            title: 'Database 101: How social media “likes” are stored in a database',
            sapo: '',
            readTimes: 6,
            numLikes: 12,
            thumbnailImage: IMAGE,
            coverImage: IMAGE,
            userId: 1,
            content: '',
            status: 'draft',
            slug: 'how-social-media',
            newsViews: 20,
            saveUsers: [],
            likes: [],
            comments: [],
            numComments: 23,
            user: {
                id: 1,
                avatar: AVATAR,
                username: 'Daniel Reis',
                firstName: 'Reis',
                lastName: 'Daniel',
                isAdmin: false,
                emailAddress: 'daniel@gmail.com',
            },
            hashTags: [
                {
                    id: 1,
                    name: 'html',
                    color: '#008335',
                },
                {
                    id: 2,
                    name: 'css',
                    color: '#ED1556',
                },
                {
                    id: 3,
                    name: 'javascript',
                    color: '#3b49df',
                },
                {
                    id: 4,
                    name: 'python',
                    color: '#ebdf37',
                },
            ],
        },
        {
            id: 5,
            title: 'Database 101: How social media “likes” are stored in a database',
            sapo: '',
            readTimes: 6,
            numLikes: 12,
            thumbnailImage: IMAGE,
            coverImage: IMAGE,
            userId: 1,
            content: '',
            status: 'draft',
            slug: 'how-social-media',
            newsViews: 20,
            saveUsers: [],
            likes: [],
            comments: [],
            numComments: 23,
            user: {
                id: 1,
                avatar: AVATAR,
                username: 'Daniel Reis',
                firstName: 'Reis',
                lastName: 'Daniel',
                isAdmin: false,
                emailAddress: 'daniel@gmail.com',
            },
            hashTags: [
                {
                    id: 1,
                    name: 'html',
                    color: '#008335',
                },
                {
                    id: 2,
                    name: 'css',
                    color: '#ED1556',
                },
                {
                    id: 3,
                    name: 'javascript',
                    color: '#3b49df',
                },
                {
                    id: 4,
                    name: 'python',
                    color: '#ebdf37',
                },
            ],
        },
    ],
}
