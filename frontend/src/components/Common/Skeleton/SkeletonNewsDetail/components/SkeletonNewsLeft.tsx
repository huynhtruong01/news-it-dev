import { Avatar, Box, Skeleton, Stack } from '@mui/material'

export function SkeletonNewsLeft() {
    return (
        <Box
            sx={{
                paddingTop: 5,
            }}
        >
            <Stack gap={2.5}>
                {Array.from(new Array(3)).map((item, idx) => (
                    <Stack alignItems={'center'} key={idx}>
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            sx={{
                                borderRadius: '50%',
                                marginBottom: 0.5,
                            }}
                        >
                            <Avatar />
                        </Skeleton>
                        <Skeleton variant="text" height={10} width={'70%'} />
                    </Stack>
                ))}
            </Stack>
        </Box>
    )
}
