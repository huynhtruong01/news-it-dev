import { SelectDashboard, StatusReport } from '@/enums'
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
        name: 'settings.Profile',
        link: '/settings/profile',
        value: '/settings/profile',
    },
    {
        name: 'settings.Accounts',
        link: '/settings/accounts',
        value: '/settings/accounts',
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

export const selectsDashboard: IObjectCommon[] = [
    {
        name: 'dashboard.news',
        value: SelectDashboard.NEWS,
        link: '/dashboard',
    },
    {
        name: 'dashboard.followers',
        value: SelectDashboard.FOLLOWERS,
        link: '/dashboard/followers',
    },
    {
        name: 'dashboard.following_user',
        value: SelectDashboard.FOLLOWING,
        link: '/dashboard/following',
    },
    {
        name: 'dashboard.following_tags',
        value: SelectDashboard.TAGS,
        link: '/dashboard/tags',
    },
    {
        name: 'dashboard.news_likes',
        value: SelectDashboard.LIKES,
        link: '/dashboard/likes',
    },
    {
        name: 'dashboard.reading_list',
        value: SelectDashboard.SAVES,
        link: '/dashboard/reading-list',
    },
]
export const reportList: IObjectCommon[] = [
    {
        id: StatusReport.RUDE_VULGAR,
        name: 'rude',
        value: 'Rude or vulgar',
    },
    {
        id: StatusReport.HARASSMENT_OR_HATE_SPEECH,
        name: 'harassment',
        value: 'Harassment or hate speech',
    },
    {
        id: StatusReport.SPAM_OR_COPYRIGHT_ISSUE,
        name: 'spam',
        value: 'Spam or copyright issue',
    },
    {
        id: StatusReport.OTHER,
        name: 'other',
        value: 'Other',
    },
]
