import { Status } from '@/enums'
import { INewsForm, IObjectCommon } from '@/models'
export const initNewsFormValues: INewsForm = {
    title: '',
    sapo: '',
    content: '',
    status: Status.DRAFT,
    coverImage: undefined,
    thumbnailImage: undefined,
    hashTags: [],
    hashTagOptionIds: [],
}

export const selectStatus: IObjectCommon[] = [
    {
        name: `status.${Status.DRAFT}`,
        value: Status.DRAFT,
    },
    {
        name: `status.${Status.PUBLIC}`,
        value: Status.PUBLIC,
    },
    {
        name: `status.${Status.UNPUBLIC}`,
        value: Status.UNPUBLIC,
    },
]
