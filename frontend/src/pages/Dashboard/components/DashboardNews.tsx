import { INews } from '@/models'
import { Box, BoxProps, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { DashboardNewsItem } from '.'

export interface IDashboardNewsProps extends BoxProps {
    newsList: INews[]
    newsCount: number
}

export function DashboardNews({ newsList, ...rest }: IDashboardNewsProps) {
    const newNewsList = useMemo(() => {
        return newsList?.length ? newsList : []
    }, [newsList])

    // TODO: FETCH NEWS BY ID USER

    return (
        <Box {...rest}>
            <Typography component="h2" variant="h6" marginBottom={2} fontWeight={700}>
                News {}
            </Typography>

            <Stack gap={2}>
                {newNewsList?.map((news) => (
                    <DashboardNewsItem key={news.id} news={news} />
                ))}
            </Stack>
        </Box>
    )
}
