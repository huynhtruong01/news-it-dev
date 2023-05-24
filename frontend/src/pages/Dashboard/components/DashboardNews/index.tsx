import { INews, INewsFilters } from '@/models'
import { Box, BoxProps, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import {
    DashboardNewsFilters,
    DashboardNewsItem,
} from '@/pages/Dashboard/components/DashboardNews/components'
import { ALL } from '@/consts'
import { EmptyList } from '@/components/Common'

export interface IDashboardNewsProps extends BoxProps {
    newsList: INews[]
    newsCount: number
}

export function DashboardNews({ newsList, newsCount, ...rest }: IDashboardNewsProps) {
    const [filters, setFilters] = useState<INewsFilters>({})

    const newNewsList = useMemo(() => {
        if (filters.status === ALL || Object.keys(filters.status || {}).length === 0) {
            return newsList
        }
        return newsList?.length ? newsList.filter((n) => n.status === filters.status) : []
    }, [newsList, filters])

    return (
        <Box {...rest}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={2}
            >
                <Typography component="h2" variant="h6" fontWeight={700}>
                    News ({newsCount})
                </Typography>
                <DashboardNewsFilters setFilters={setFilters} />
            </Stack>

            <Stack gap={2}>
                {newNewsList.length === 0 && <EmptyList title="No news you created" />}
                {newNewsList?.map((news) => (
                    <DashboardNewsItem key={news.id} news={news} />
                ))}
            </Stack>
        </Box>
    )
}
