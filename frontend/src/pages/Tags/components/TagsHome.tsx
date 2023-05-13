import { Box, Stack, Typography } from '@mui/material'
import { TagsFilters, TagsList } from '@/pages/Tags/components'
import { tagList } from '@/data'
import { useEffect, useState } from 'react'
import { IFilters } from '@/models'
import { Order } from '@/enums'

// export interface ITagsProps {}

export function TagsHome() {
    const [filters, setFilters] = useState<IFilters>({
        limit: 10,
        page: 1,
        createdAt: Order.ASC,
    })

    // TODO: FETCH ALL TAGS
    useEffect(() => {
        // TODO: FETCH TAG HERE.
    }, [filters])

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={3}
            >
                <Typography component="h1" variant="h4" fontWeight={700}>
                    Top Tags
                </Typography>
                <Box>
                    <TagsFilters setFilters={setFilters} />
                </Box>
            </Stack>

            <Box>
                <TagsList tags={tagList} />
            </Box>
        </Box>
    )
}
