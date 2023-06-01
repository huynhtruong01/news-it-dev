import { NewsFilters } from '@/enums/news'
import { IObjectCommon } from '@/models'

export const articleHeader: IObjectCommon[] = [
    {
        name: 'common.relevant',
        value: NewsFilters.RELEVANT,
    },
    {
        name: 'common.latest',
        value: NewsFilters.LATEST,
    },
    {
        name: 'common.top',
        value: NewsFilters.TOP,
    },
]

export const tagHeader: IObjectCommon[] = [
    {
        name: 'common.latest',
        value: NewsFilters.LATEST,
    },
    {
        name: 'common.top',
        value: NewsFilters.TOP,
    },
]

export const IMAGE =
    'https://res.cloudinary.com/practicaldev/image/fetch/s--Rsd1j1dG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x57e86jykz6x759rvf9c.png'

export const AVATAR =
    'https://res.cloudinary.com/practicaldev/image/fetch/s--xuf5tW6V--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/468493/e1ecb528-6156-46ab-b02f-807a6241b96b.png'

export const selectReadingList: IObjectCommon[] = [
    {
        name: 'Archive',
        value: 1,
    },
    {
        name: 'Unarchive',
        value: 0,
    },
]

export const settingsNav: IObjectCommon[] = [
    {
        name: 'Profile',
        link: '/settings/profile',
    },
    {
        name: 'Accounts',
        link: '/settings/accounts',
    },
]

export const navMainHome: IObjectCommon[] = [
    {
        name: 'main_home.home',
        link: '/',
    },
    {
        name: 'main_home.reading_list',
        link: '/reading-list',
    },
    {
        name: 'main_home.tags',
        link: '/tags',
    },
]
