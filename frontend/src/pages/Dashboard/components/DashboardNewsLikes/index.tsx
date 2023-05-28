import { EmptyList, NewsList } from '@/components/Common'
import { INews, INewsFilters } from '@/models'
import { Box, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { DashboardNewsLikesFilters } from '@/pages/Dashboard/components/DashboardNewsLikes/components'

export interface IDashboardNewsLikesProps {
    newsLikes: INews[]
}

export function DashboardNewsLikes({ newsLikes }: IDashboardNewsLikesProps) {
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
                    News Likes
                </Typography>
                <DashboardNewsLikesFilters setFilters={setFilters} />
            </Stack>

            <Box>
                {newNewsLikes.length === 0 && <EmptyList title="No news likes" />}
                {newNewsLikes?.length && <NewsList newsList={newNewsLikes} />}
            </Box>
        </Box>
    )
}
