import { SkeletonReadingItem } from '@/components/Common/Skeleton/SkeletonReadingList/components'
import { Paper, Stack } from '@mui/material'

export interface ISkeletonReadingListProps {
    quantities?: number
}

export function SkeletonReadingList({ quantities = 3 }: ISkeletonReadingListProps) {
    return (
        <Stack component={Paper} elevation={1}>
            {Array.from(new Array(quantities)).map((item, idx) => (
                <SkeletonReadingItem key={idx} />
            ))}
        </Stack>
    )
}
