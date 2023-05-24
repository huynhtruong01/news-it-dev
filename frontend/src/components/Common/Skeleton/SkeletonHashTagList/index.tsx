import { Box, Grid } from '@mui/material'
import { SkeletonHashTagItem } from '@/components/Common/Skeleton/SkeletonHashTagList/components'

export interface ISkeletonHashTagListProps {
    column?: number
}

export function SkeletonHashTagList({ column = 3 }: ISkeletonHashTagListProps) {
    return (
        <Grid container spacing={column}>
            {Array.from(new Array(12)).map((item, idx) => (
                <Grid key={idx} item md={6}>
                    <SkeletonHashTagItem />
                </Grid>
            ))}
        </Grid>
    )
}
