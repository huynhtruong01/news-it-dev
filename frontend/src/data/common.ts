import { NewsFilters } from '@/enums/news'
import { IObjectCommon } from '@/models'

export const articleHeader: IObjectCommon[] = [
    {
        name: 'Latest',
        value: NewsFilters.LATEST,
    },
    {
        name: 'Top',
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
