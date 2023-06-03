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
                            top: {
                                md: '-64px',
                                xs: '-32px',
                            },
                            left: {
                                md: '50%',
                                xs: '14%',
                            },
                            transform: 'translateX(-50%)',
                            width: {
                                md: 128,
                                xs: 68,
                            },
                            height: {
                                md: 128,
                                xs: 68,
                            },
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.contrastText,
                            overflow: 'hidden',
                            border: {
                                md: `8px solid ${alpha(
                                    theme.palette.secondary.main,
                                    0.2
                                )}`,
                                xs: `4px solid ${alpha(
                                    theme.palette.secondary.main,
                                    0.2
                                )}`,
                            },
                        }}
                    >
                        <Skeleton
                            variant="rounded"
                            width={'100%'}
                            height={'100%'}
                        ></Skeleton>
                    </Box>
                </Box>
                <Box
                    padding={{
                        md: theme.spacing(8, 3, 3),
                        xs: theme.spacing(6, 2, 2),
                    }}
                    textAlign="center"
                >
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
