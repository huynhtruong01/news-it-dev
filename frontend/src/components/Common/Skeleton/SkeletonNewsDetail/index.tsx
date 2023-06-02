import { Box, Grid } from '@mui/material'
import {
    SkeletonNewsDetailMain,
    SkeletonNewsLeft,
    SkeletonNewsRight,
} from '@/components/Common/Skeleton/SkeletonNewsDetail/components'

export function SkeletonNewsDetail() {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid
                    item
                    sx={{
                        width: '64px',
                        display: {
                            lg: 'block',
                            xs: 'none',
                        },
                    }}
                >
                    <SkeletonNewsLeft />
                </Grid>
                <Grid item xs={12} md={8}>
                    <SkeletonNewsDetailMain />
                </Grid>
                <Grid item xs={12} md>
                    <SkeletonNewsRight />
                </Grid>
            </Grid>
        </Box>
    )
}
