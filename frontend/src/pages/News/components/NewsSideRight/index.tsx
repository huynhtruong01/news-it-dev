import { INews, IUser } from '@/models'
import { Box, BoxProps, Stack } from '@mui/material'
import {
    NewsSideRightRelation,
    NewsSideRightRelationUser,
    NewsSideRightUser,
} from '@/pages/News/components/NewsSideRight/components'
import { useTranslation } from 'react-i18next'

export interface INewsSideRightProps extends BoxProps {
    news: INews | null
}

export function NewsSideRight({ news, ...rest }: INewsSideRightProps) {
    const { t } = useTranslation()

    return (
        news && (
            <Box component={Stack} gap={2} {...rest}>
                <NewsSideRightUser user={news.user as IUser} t={t} />
                <NewsSideRightRelationUser news={news} user={news.user as IUser} t={t} />
                <NewsSideRightRelation
                    news={news}
                    hashTagIds={news.hashTagIds as number[]}
                    t={t}
                />
            </Box>
        )
    )
}
