import { SkeletonHashTagItem } from '@/components/Common/Skeleton/SkeletonHashTagList/components'
import { Grid } from '@mui/material'

export interface ISkeletonHashTagListProps {
    column?: number
}

export function SkeletonHashTagList({ column = 3 }: ISkeletonHashTagListProps) {
    return (
        <Grid container spacing={2}>
            {Array.from(new Array(12)).map((item, idx) => (
                <Grid key={idx} item md={12 / column} sm={6} xs={12}>
                    <SkeletonHashTagItem />
                </Grid>
            ))}
        </Grid>
    )
}
