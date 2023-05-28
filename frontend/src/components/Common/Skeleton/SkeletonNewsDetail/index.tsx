// export interface ISkeletonNewsDetailProps {}

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
                    }}
                >
                    <SkeletonNewsLeft />
                </Grid>
                <Grid item md={8}>
                    <SkeletonNewsDetailMain />
                </Grid>
                <Grid item md>
                    <SkeletonNewsRight />
                </Grid>
            </Grid>
        </Box>
    )
}
