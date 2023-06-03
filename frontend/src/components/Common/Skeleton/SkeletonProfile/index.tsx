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
                        height: {
                            md: 150,
                            xs: 100,
                        },
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
                    padding: {
                        md: 0,
                        xs: 2,
                    },
                }}
            >
                <SkeletonProfileHeader />
                <SkeletonProfileMain />
            </Stack>
        </Box>
    )
}
