import { Box, Skeleton, Stack, Paper } from '@mui/material'

export function SkeletonNews() {
    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                overflow: 'hidden',
            }}
        >
            <Box>
                <Skeleton
                    variant="rounded"
                    width={'100%'}
                    height={280}
                    sx={{
                        borderRadius: 0,
                    }}
                />
            </Box>

            <Box padding={2.5}>
                <Stack direction="row" gap={1} marginBottom={2}>
                    <Skeleton variant="circular" width={32} height={32} />
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

                <Box>
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
                        <Skeleton variant="rounded" width={80} height={28} />
                        <Skeleton variant="rounded" width={80} height={28} />
                    </Stack>
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Stack direction="row" gap={1}>
                            <Skeleton variant="rounded" width={100} height={40} />
                            <Skeleton variant="rounded" width={100} height={40} />
                        </Stack>
                        <Skeleton variant="rounded" width={100} height={40} />
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
