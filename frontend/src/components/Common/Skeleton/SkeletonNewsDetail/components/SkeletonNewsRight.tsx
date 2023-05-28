import { Skeleton, Stack } from '@mui/material'

export function SkeletonNewsRight() {
    return (
        <Stack gap={2}>
            <Skeleton variant="rounded" width={'100%'} height={200} />
            <Skeleton variant="rounded" width={'100%'} height={400} />
            <Skeleton variant="rounded" width={'100%'} height={500} />
        </Stack>
    )
}
