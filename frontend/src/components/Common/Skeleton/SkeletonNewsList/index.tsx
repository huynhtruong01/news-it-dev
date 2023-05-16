import { Stack } from '@mui/material'
import { SkeletonNews } from '@/components/Common/Skeleton/SkeletonNewsList/components'

export function SkeletonNewsList() {
    return (
        <Stack gap={2}>
            {Array.from(new Array(5)).map((item, idx) => (
                <SkeletonNews key={idx} />
            ))}
        </Stack>
    )
}
