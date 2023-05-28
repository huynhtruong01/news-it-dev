import { EmptyList, NewsList } from '@/components/Common'
import { INews, INewsFilters } from '@/models'
import { DashboardReadingListFilters } from '@/pages/Dashboard/components/DashboardReadingList/components'
import { Box, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

export interface IDashboardReadingListProps {
    saves: INews[]
}

export function DashboardReadingList({ saves }: IDashboardReadingListProps) {
    const [filters, setFilters] = useState<INewsFilters>({
        search: '',
    })

    const newSaves = useMemo(() => {
        const searchSaves = saves.filter((n) => {
            if (!filters.search || filters.search === '') return true
            return (filters.search as string)
                .toLowerCase()
                .split(' ')
                .filter((x) => !!x)
                .some((w) => n.title.toLowerCase().includes(w))
        })

        return saves?.length && searchSaves.length ? searchSaves : []
    }, [saves, filters])

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={2}
            >
                <Typography component="h2" variant="h6" fontWeight={700}>
                    Reading List
                </Typography>
                <DashboardReadingListFilters setFilters={setFilters} />
            </Stack>

            <Box>
                {newSaves.length === 0 && <EmptyList title="No news reading" />}
                {newSaves.length && <NewsList newsList={newSaves} />}
            </Box>
        </Box>
    )
}
