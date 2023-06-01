import { INews, INewsFilters } from '@/models'
import { Box, BoxProps, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import {
    DashboardNewsFilters,
    DashboardNewsItem,
} from '@/pages/Dashboard/components/DashboardNews/components'
import { ALL } from '@/consts'
import { EmptyList } from '@/components/Common'
import { useTranslation } from 'react-i18next'

export interface IDashboardNewsProps extends BoxProps {
    newsList: INews[]
    newsCount: number
}

export function DashboardNews({ newsList, newsCount, ...rest }: IDashboardNewsProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INewsFilters>({
        status: ALL,
        search: '',
    })

    const newNewsList = useMemo(() => {
        return newsList
            .filter((n) => {
                const filterStatus =
                    filters.status === n.status || filters.status === ALL ? true : false
                const filtersSearch =
                    filters.search === ''
                        ? true
                        : (filters.search as string)
                              .toLowerCase()
                              .split(' ')
                              .filter((x) => !!x)
                              .some((w) => n.title.toLowerCase().includes(w))

                return filterStatus && filtersSearch
            })
            .sort(
                (a, b) =>
                    new Date(b.createdAt as Date).getTime() -
                    new Date(a.createdAt as Date).getTime()
            )
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
                    {t('dashboard.news')} ({newsCount})
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
