import { NewsList } from '@/components/Common'
import { INews } from '@/models'
import { theme } from '@/utils'
import { BoxProps, Paper, Stack, Typography } from '@mui/material'

export interface IProfileNewsProps extends BoxProps {
    news: INews[]
}

export function ProfileNews({ news }: IProfileNewsProps) {
    return (
        <Stack gap={2}>
            {news.length === 0 && (
                <Stack
                    component={Paper}
                    direction={'row'}
                    padding={theme.spacing(3)}
                    justifyContent="center"
                >
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: theme.typography.h6,
                        }}
                    >
                        No news here.
                    </Typography>
                </Stack>
            )}
            <NewsList newsList={news} />
        </Stack>
    )
}
