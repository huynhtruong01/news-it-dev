import { INews, IUser } from '@/models'
import { Box, BoxProps, Stack } from '@mui/material'
import { NewsSideRightRelation, NewsSideRightRelationUser, NewsSideRightUser } from '.'

export interface INewsSideRightProps extends BoxProps {
    news: INews | null
}

export function NewsSideRight({ news, ...rest }: INewsSideRightProps) {
    return (
        news && (
            <Box component={Stack} gap={2} {...rest}>
                <NewsSideRightUser user={news.user as IUser} />
                <NewsSideRightRelationUser news={news} user={news.user as IUser} />
                <NewsSideRightRelation
                    newsId={news.id}
                    hashTagIds={news.hashTagIds as number[]}
                />
            </Box>
        )
    )
}
