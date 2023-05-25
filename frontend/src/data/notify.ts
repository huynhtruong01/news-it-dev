import { ALL } from '@/consts'
import { IObjectCommon } from '@/models'

export const notifyFilters: IObjectCommon[] = [
    {
        name: 'All',
        value: ALL,
    },
    {
        name: 'Not Read',
        value: 0,
    },
    {
        name: 'Read',
        value: 1,
    },
]
