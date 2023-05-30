import { theme } from '@/utils'
import { Box, Paper, Skeleton, Typography, alpha } from '@mui/material'

export function SkeletonProfileHeader() {
    return (
        <Box component="header" zIndex={10}>
            <Box component={Paper} elevation={1}>
                <Box
                    sx={{
                        position: 'relative',
                        paddingTop: 2,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-64px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 128,
                            height: 128,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.contrastText,
                            overflow: 'hidden',
                            border: `8px solid ${alpha(
                                theme.palette.secondary.main,
                                0.2
                            )}`,
                        }}
                    >
                        <Skeleton
                            variant="rounded"
                            width={'100%'}
                            height={'100%'}
                        ></Skeleton>
                    </Box>
                </Box>
                <Box padding={theme.spacing(8, 3, 3)} textAlign="center">
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight={700}
                        marginBottom={1}
                    >
                        <Skeleton variant="text" height={20} />
                        <Skeleton variant="text" height={20} />
                        <Skeleton variant="text" height={20} />
                        <Skeleton variant="text" height={20} />
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: theme.typography.body2,
                        }}
                    ></Typography>
                </Box>
            </Box>
        </Box>
    )
}
