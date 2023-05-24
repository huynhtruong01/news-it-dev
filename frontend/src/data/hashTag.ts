import { IHashTag, IOptionItem } from '@/models'
import { AVATAR, IMAGE } from '.'

export const tags: IOptionItem[] = [
    {
        name: 'html',
        id: 1,
    },
    {
        name: 'css',
        id: 2,
    },
    {
        name: 'javascript',
        id: 3,
    },
    {
        name: 'reactjs',
        id: 4,
    },
    {
        name: 'devops',
        id: 5,
    },
    {
        name: 'beginner',
        id: 6,
    },
    {
        name: 'python',
        id: 7,
    },
    {
        name: 'webdev',
        id: 8,
    },
    {
        name: 'typescript',
        id: 9,
    },
    {
        name: 'nodejs',
        id: 10,
    },
]

export const tagList: IHashTag[] = [
    {
        id: 1,
        name: 'html',
        color: '#008335',
        title: '',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
    {
        id: 2,
        name: 'css',
        color: '#ED1556',
        title: '',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
    {
        id: 3,
        name: 'javascript',
        color: '#3b49df',
        title: '',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
    {
        id: 4,
        name: 'python',
        color: '#ebdf37',
        title: '',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
    },
]

export const tag: IHashTag = {
    id: 1,
    title: '',
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
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
                },
                {
                    id: 2,
                    name: 'css',
                    color: '#ED1556',
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
                },
                {
                    id: 3,
                    name: 'javascript',
                    color: '#3b49df',
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
                },
                {
                    id: 4,
                    name: 'python',
                    color: '#ebdf37',
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
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
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
                },
                {
                    id: 2,
                    name: 'css',
                    color: '#ED1556',
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
                },
                {
                    id: 3,
                    name: 'javascript',
                    color: '#3b49df',
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
                },
                {
                    id: 4,
                    name: 'python',
                    color: '#ebdf37',
                    title: '',
                    description:
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
                },
            ],
        },
    ],
}
