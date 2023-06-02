import { theme } from '@/utils'
import { Avatar, Box, Paper, Skeleton, Stack, Typography } from '@mui/material'

export function SkeletonNewsDetailMain() {
    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                height: '100%',
                borderRadius: theme.spacing(0.75),
                overflow: 'hidden',
            }}
        >
            <Box component="header" width={'100%'}>
                <Box
                    width={'100%'}
                    height={{
                        md: 420,
                        sm: 300,
                        xs: 150,
                    }}
                >
                    <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={'100%'}
                        sx={{
                            borderRadius: theme.spacing(0.75, 0.75, 0, 0),
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        padding: {
                            md: theme.spacing(4, 8, 0),
                            xs: theme.spacing(1.5, 1.5, 0),
                        },
                    }}
                >
                    <Box>
                        <Stack direction={'row'} alignItems={'center'} marginBottom={2.5}>
                            <Box>
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                    sx={{
                                        borderRadius: '50%',
                                    }}
                                >
                                    <Avatar />
                                </Skeleton>
                            </Box>
                            <Box paddingLeft={theme.spacing(1.5)} flex={1}>
                                <Skeleton variant="text" height={20} width="18%" />
                                <Skeleton variant="text" height={15} width="8%" />
                            </Box>
                        </Stack>
                    </Box>

                    <Box>
                        <Box>
                            <Typography component="h2" variant="h3">
                                <Skeleton variant="text" width="90%" />
                                <Skeleton variant="text" width="70%" />
                            </Typography>
                        </Box>
                        <Stack direction={'row'} gap={1}>
                            {Array.from(new Array(4)).map((item, idx) => (
                                <Skeleton key={idx} height={40} width={60} />
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Box>

            <Box
                component="article"
                padding={{
                    lg: theme.spacing(4, 8),
                    xs: theme.spacing(0, 1.5, 2),
                }}
            >
                <Box>
                    {Array.from(new Array(50)).map((item, idx) => (
                        <Skeleton key={idx} variant="text" width={'100%'} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
