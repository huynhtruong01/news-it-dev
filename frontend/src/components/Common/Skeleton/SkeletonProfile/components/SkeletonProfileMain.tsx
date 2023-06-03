import { theme } from '@/utils'
import { Grid, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { SkeletonNewsList } from '../..'

export function SkeletonProfileMain() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Stack gap={2}>
                    {Array.from(new Array(3)).map((item, idx) => (
                        <Stack
                            key={idx}
                            component={Paper}
                            gap={1}
                            padding={theme.spacing(1.5, 2)}
                        >
                            {Array.from(new Array(3)).map((other, idx) => (
                                <Stack key={idx} direction={'row'} gap={1}>
                                    <Typography>
                                        <Skeleton variant="text" width={30} height={20} />
                                    </Typography>
                                    <Typography flex={1}>
                                        <Skeleton variant="text" height={20} />
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    ))}
                </Stack>
            </Grid>
            <Grid item md={8}>
                <SkeletonNewsList columns={1} quantities={3} />
            </Grid>
        </Grid>
    )
}
