import { theme } from '@/utils'
import { Box, Skeleton, Stack, Typography, alpha } from '@mui/material'

export function SkeletonReadingItem() {
    return (
        <Box
            sx={{
                '&:not(:last-of-type)': {
                    borderBottom: `1px solid ${alpha(
                        theme.palette.secondary.main,
                        0.075
                    )}`,
                },
            }}
        >
            <Stack
                direction={{
                    md: 'row',
                    xs: 'column',
                }}
                justifyContent={'space-between'}
                alignItems={{
                    md: 'center',
                    xs: 'flex-start',
                }}
                gap={{
                    md: 4,
                    xs: 2,
                }}
                sx={{
                    padding: 3,
                }}
            >
                <Stack direction={'row'} gap={2} flex={1}>
                    <Skeleton
                        variant="rounded"
                        width={32}
                        height={32}
                        sx={{
                            borderRadius: '50%',
                        }}
                    ></Skeleton>
                    <Box flex={1} width={'100%'}>
                        <Typography
                            component="h3"
                            fontSize={{
                                md: '18px',
                                xs: '1rem',
                            }}
                            sx={{
                                width: '100%',
                                lineHeight: 1.25,
                            }}
                        >
                            <Skeleton
                                variant="text"
                                sx={{
                                    width: {
                                        md: '80%',
                                        xs: '100%',
                                    },
                                }}
                            />
                            <Skeleton variant="text" width={'60%'} />
                        </Typography>
                        <Stack direction={'row'} gap={0.5}>
                            {Array.from(new Array(6)).map((item, idx) => (
                                <Skeleton
                                    key={idx}
                                    variant="text"
                                    width={25}
                                    height={16}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Stack>
                <Skeleton
                    variant="rounded"
                    height={35}
                    sx={{
                        width: {
                            md: 100,
                            xs: '100%',
                        },
                    }}
                />
            </Stack>
        </Box>
    )
}
