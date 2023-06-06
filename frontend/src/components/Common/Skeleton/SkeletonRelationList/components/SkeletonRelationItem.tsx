import { theme } from '@/utils'
import { Box, Paper, Skeleton, Typography, alpha, useMediaQuery } from '@mui/material'

export interface ISkeletonRelationItem {
    noPaper?: boolean
}

export function SkeletonRelationItem({ noPaper = false }: ISkeletonRelationItem) {
    const isMiddleScreen = useMediaQuery('(min-width:320px)')

    return (
        <Box
            component={noPaper ? 'div' : Paper}
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
