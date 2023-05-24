import { Box, Grid } from '@mui/material'
import { SkeletonNews } from '@/components/Common/Skeleton/SkeletonNewsList/components'

export function SkeletonNewsList() {
    return (
        <Grid container spacing={2}>
            {Array.from(new Array(5)).map((item, idx) => (
                <Grid key={idx} item md={6}>
                    <SkeletonNews />
                </Grid>
            ))}
        </Grid>
    )
}
