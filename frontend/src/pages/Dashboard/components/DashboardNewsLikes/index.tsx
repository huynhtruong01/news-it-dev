import { EmptyList, NewsList } from '@/components/Common'
import { INews, INewsFilters } from '@/models'
import { Box, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { DashboardNewsLikesFilters } from '@/pages/Dashboard/components/DashboardNewsLikes/components'
import { useTranslation } from 'react-i18next'

export interface IDashboardNewsLikesProps {
    newsLikes: INews[]
    numLikes: number
}

export function DashboardNewsLikes({ newsLikes, numLikes }: IDashboardNewsLikesProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INewsFilters>({
        search: '',
    })

    const newNewsLikes = useMemo(() => {
        const searchNewsLikes = newsLikes.filter((n) => {
            if (!filters.search || filters.search === '') return true
            return (filters.search as string)
                .toLowerCase()
                .split(' ')
                .filter((x) => !!x)
                .some((w) => n.title.toLowerCase().includes(w))
        })

        return newsLikes?.length && searchNewsLikes.length ? searchNewsLikes : []
    }, [newsLikes, filters])

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={2}
            >
                <Typography component="h2" variant="h6" fontWeight={700}>
                    {t('dashboard.news_likes')} ({numLikes})
                </Typography>
                <DashboardNewsLikesFilters setFilters={setFilters} />
            </Stack>

            <Box>
                {newNewsLikes.length === 0 && (
                    <EmptyList title={t('empty.no_news_liked')} />
                )}
                {newNewsLikes?.length && <NewsList newsList={newNewsLikes} />}
            </Box>
        </Box>
    )
}
