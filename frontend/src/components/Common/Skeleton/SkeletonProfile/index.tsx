import {
    SkeletonProfileHeader,
    SkeletonProfileMain,
} from '@/components/Common/Skeleton/SkeletonProfile/components'
import { Box, Skeleton, Stack } from '@mui/material'

export function SkeletonProfile() {
    return (
        <Box>
            <Box>
                <Skeleton
                    variant="rounded"
                    sx={{
                        width: '100%',
                        height: 150,
                    }}
                />
            </Box>
            <Stack
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: 1024,
                    margin: 'auto',
                    marginTop: '-4rem',
                }}
            >
                <SkeletonProfileHeader />
                <SkeletonProfileMain />
            </Stack>
        </Box>
    )
}
