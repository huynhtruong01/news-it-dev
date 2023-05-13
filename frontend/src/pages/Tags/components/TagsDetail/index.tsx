import { Box, Stack } from '@mui/material'
import {
    TagsDetailHeader,
    TagsDetailNews,
} from '@/pages/Tags/components/TagsDetail/components'
import { tag } from '@/data'

export function TagsDetail() {
    // TODO: FETCH TAG DETAIL BY SLUG

    return (
        <Box>
            <Stack
                sx={{
                    width: '100%',
                    gap: 4,
                }}
            >
                <TagsDetailHeader tag={tag} />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '280px 1fr 280px',
                        gap: 2,
                    }}
                >
                    {/* TODO: MAKE LEFT TAG HERE */}
                    <Box>Left tag</Box>
                    <TagsDetailNews news={tag.news} />
                    <Box>Right tag</Box>
                </Box>
            </Stack>
        </Box>
    )
}
