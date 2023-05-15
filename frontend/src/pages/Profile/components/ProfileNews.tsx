import { ArticleItem } from '@/features/ArticleContainer/components'
import { INews } from '@/models'
import { BoxProps, Stack, Paper, Typography } from '@mui/material'
import { theme } from '@/utils'

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
            {news.map((article) => (
                <ArticleItem key={article.id} article={article} />
            ))}
        </Stack>
    )
}
