import { Box, Paper, Skeleton, Stack } from '@mui/material'

export function SkeletonHashTagItem() {
    return (
        <Box component={Paper} padding={3}>
            <Stack gap={1}>
                <Skeleton
                    variant="rounded"
                    width={100}
                    height={38}
                    sx={{
                        marginBottom: 1,
                    }}
                />
                <Skeleton variant="rounded" width={'80%'} height={20} />
                <Skeleton
                    variant="rounded"
                    width={'25%'}
                    height={15}
                    sx={{
                        marginBottom: 2,
                    }}
                />
                <Skeleton variant="rounded" width={110} height={40} />
            </Stack>
        </Box>
    )
}
