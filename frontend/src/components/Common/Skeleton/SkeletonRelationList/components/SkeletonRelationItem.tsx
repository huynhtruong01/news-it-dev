import { theme } from '@/utils'
import { Box, Skeleton, Typography, alpha, useMediaQuery } from '@mui/material'

export function SkeletonRelationItem() {
    const isMiddleScreen = useMediaQuery('(min-width:320px)')

    return (
        <Box
            padding={2}
            sx={{
                '&:not(:last-of-type)': {
                    borderBottom: `1px solid ${alpha(
                        theme.palette.secondary.main,
                        0.075
                    )}`,
                },
            }}
        >
            <Skeleton
                variant="rounded"
                width={'100%'}
                sx={{
                    height: 150,
                }}
            />
            <Typography
                component="h4"
                variant={isMiddleScreen ? 'h6' : 'h5'}
                marginTop={1}
            >
                <Skeleton variant="text" width={'100%'} />
                <Skeleton variant="text" width={'60%'} />
            </Typography>
            <Skeleton variant="text" width={'30%'} height={20} />
        </Box>
    )
}
