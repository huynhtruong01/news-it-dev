import { Box, Stack, Typography } from '@mui/material'
import {
    ReadingListFilters,
    ReadingListNews,
    ReadingListTags,
} from '@/pages/ReadingList/components'
import { useEffect, useState } from 'react'
import { IFilters } from '@/models'
import { newsList } from '@/data'

export function ReadingList() {
    const [filters, setFilters] = useState<IFilters>({
        page: 1,
        limit: 10,
    })

    useEffect(() => {
        document.title = 'Reading list - DEV Community'
    }, [])

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={3}
            >
                <Typography component="h1" variant="h4" fontWeight={700}>
                    Reading list (2)
                </Typography>
                <ReadingListFilters setFilters={setFilters} />
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '240px 1fr',
                    gap: 2,
                }}
            >
                <ReadingListTags hashTagIds={[1, 2, 3]} setFilters={setFilters} />
                <ReadingListNews news={newsList} />
            </Box>
        </Box>
    )
}
