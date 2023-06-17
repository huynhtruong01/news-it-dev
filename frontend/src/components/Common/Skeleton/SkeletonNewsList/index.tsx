import { SkeletonNews } from '@/components/Common/Skeleton/SkeletonNewsList/components'
import { Grid } from '@mui/material'

export interface ISkeletonNewsListProps {
    columns?: number
    quantities?: number
    noImage?: boolean
}

export function SkeletonNewsList({
    columns = 2,
    quantities = 5,
    noImage = false,
}: ISkeletonNewsListProps) {
    return (
        <Grid container spacing={2}>
            {Array.from(new Array(quantities)).map((item, idx) => (
                <Grid key={idx} item md={12 / columns} xs={12}>
                    <SkeletonNews noImage={noImage} />
                </Grid>
            ))}
        </Grid>
    )
}
