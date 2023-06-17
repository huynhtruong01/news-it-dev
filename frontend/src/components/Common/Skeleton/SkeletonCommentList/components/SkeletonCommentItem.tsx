import { Box, BoxProps, Paper, Skeleton, Stack } from '@mui/material'

export type ISkeletonCommentItemProps = BoxProps

export function SkeletonCommentItem({ ...rest }: ISkeletonCommentItemProps) {
    return (
        <Box {...rest}>
            <Stack
                direction={'row'}
                gap={{
                    md: 2,
                    xs: 1,
                }}
            >
                <Skeleton
                    variant="circular"
                    sx={{
                        borderRadius: '50%',
                        width: {
                            md: 32,
                            xs: 24,
                        },
                        height: {
                            md: 32,
                            xs: 24,
                        },
                    }}
                />

                <Box flex={1}>
                    <Box
                        component={Paper}
                        elevation={1}
                        sx={{
                            padding: 1,
                        }}
                    >
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Skeleton
                                variant="text"
                                sx={{
                                    height: 20,
                                    width: 100,
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    height: 20,
                                    width: 40,
                                }}
                            />
                        </Stack>
                        <Box marginTop={1}>
                            <Skeleton
                                variant="text"
                                sx={{
                                    height: 20,
                                    width: '95%',
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    height: 20,
                                    width: '80%',
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    height: 20,
                                    width: '90%',
                                }}
                            />
                        </Box>
                    </Box>
                    <Stack direction={'row'} gap={1} marginTop={1}>
                        {Array.from(new Array(2)).map((item) => (
                            <Skeleton
                                key={item}
                                variant="rounded"
                                sx={{
                                    width: 110,
                                    height: 32,
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}
