import { Box, Skeleton, Stack, Paper } from '@mui/material'

export interface ISkeletonNewsProps {
    noImage?: boolean
}

export function SkeletonNews({ noImage = false }: ISkeletonNewsProps) {
    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                overflow: 'hidden',
                width: '100%',
            }}
        >
            {!noImage && (
                <Box>
                    <Skeleton
                        variant="rounded"
                        width={'100%'}
                        sx={{
                            borderRadius: 0,
                            height: {
                                md: 270,
                                sm: 200,
                                xs: 150,
                            },
                        }}
                    />
                </Box>
            )}

            <Box padding={2.5}>
                <Stack direction="row" gap={1} marginBottom={2}>
                    <Skeleton
                        variant="circular"
                        width={32}
                        height={32}
                        sx={{
                            borderRadius: '50%',
                        }}
                    />
                    <Box flex={1}>
                        <Skeleton
                            variant="text"
                            width={'20%'}
                            height={17}
                            sx={{ fontSize: '1rem' }}
                        />
                        <Skeleton
                            variant="text"
                            width={'10%'}
                            height={17}
                            sx={{ fontSize: '1rem' }}
                        />
                    </Box>
                </Stack>

                <Box
                    paddingLeft={{
                        md: 5,
                        xs: 0,
                    }}
                >
                    <Box marginBottom={0.5}>
                        <Skeleton
                            variant="text"
                            width={'90%'}
                            height={30}
                            sx={{ fontSize: '1rem' }}
                        />
                        <Skeleton
                            variant="text"
                            width={'50%'}
                            height={30}
                            sx={{ fontSize: '1rem' }}
                        />
                    </Box>
                    <Stack direction="row" gap={1} marginBottom={2.5}>
                        <Skeleton variant="rounded" width={80} height={28} />
                        <Skeleton variant="rounded" width={80} height={28} />
                        <Skeleton
                            variant="rounded"
                            width={80}
                            height={28}
                            sx={{
                                display: {
                                    md: 'block',
                                    xs: 'none',
                                },
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            width={80}
                            height={28}
                            sx={{
                                display: {
                                    md: 'block',
                                    xs: 'none',
                                },
                            }}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Stack direction="row" gap={1}>
                            <Skeleton variant="rounded" width={100} height={40} />
                            <Skeleton variant="rounded" width={100} height={40} />
                        </Stack>
                        <Skeleton
                            variant="rounded"
                            width={100}
                            height={40}
                            sx={{
                                display: {
                                    md: 'block',
                                    xs: 'none',
                                },
                            }}
                        />
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
