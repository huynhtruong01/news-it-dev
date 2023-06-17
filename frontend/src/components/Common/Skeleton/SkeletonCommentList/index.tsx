import { Stack } from '@mui/material'
import { SkeletonCommentItem } from './components'

export interface ISkeletonCommentListProps {
    quantities?: number
}

export function SkeletonCommentList({ quantities = 3 }: ISkeletonCommentListProps) {
    return (
        <Stack gap={3}>
            {Array.from(new Array(quantities)).map((item) => (
                <SkeletonCommentItem key={item} />
            ))}
        </Stack>
    )
}
