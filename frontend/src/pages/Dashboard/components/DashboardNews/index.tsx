import { EmptyList, TitleContainerPage } from '@/components/Common'
import { ALL } from '@/consts'
import { INews, INewsFilters } from '@/models'
import {
    DashboardNewsFilters,
    DashboardNewsItem,
} from '@/pages/Dashboard/components/DashboardNews/components'
import { Box, BoxProps, Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TitleDashboard } from '..'

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
            <TitleContainerPage
                sx={{
                    marginBottom: 2,
                }}
            >
                <TitleDashboard text={t('dashboard.news') as string} nums={newsCount} />
                <DashboardNewsFilters setFilters={setFilters} />
            </TitleContainerPage>

            <Stack gap={2}>
                {newNewsList.length === 0 && (
                    <EmptyList title={t('empty.no_news_created')} />
                )}
                {newNewsList?.map((news) => (
                    <DashboardNewsItem key={news.id} news={news} />
                ))}
            </Stack>
        </Box>
    )
}
