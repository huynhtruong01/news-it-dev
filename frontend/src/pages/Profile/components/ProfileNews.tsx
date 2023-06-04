import { NewsList } from '@/components/Common'
import { INews, IUser } from '@/models'
import { theme } from '@/utils'
import { BoxProps, Paper, Stack, Typography } from '@mui/material'

export interface IProfileNewsProps extends BoxProps {
    news: INews[]
    user?: IUser
}

export function ProfileNews({ news, user }: IProfileNewsProps) {
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
            <NewsList newsList={news} user={user} />
        </Stack>
    )
}
