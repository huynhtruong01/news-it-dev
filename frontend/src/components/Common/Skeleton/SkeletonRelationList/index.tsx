import { Stack } from '@mui/material'
import { SkeletonRelationItem } from '@/components/Common/Skeleton/SkeletonRelationList/components'

export interface ISkeletonRelationListProps {
    quantities?: number
}

export function SkeletonRelationList({ quantities = 3 }: ISkeletonRelationListProps) {
    return (
        <Stack gap={2} paddingBottom={2}>
            {Array.from(new Array(quantities)).map((item, idx) => (
                <SkeletonRelationItem key={idx} />
            ))}
        </Stack>
    )
}
