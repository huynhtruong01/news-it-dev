import { ArticleItem } from '@/features/ArticleContainer/components'
import { INews } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack } from '@mui/material'
import { useMemo } from 'react'

export interface ITagsDetailNewsProps extends BoxProps {
    news?: INews[]
}

export function TagsDetailNews({ news, ...rest }: ITagsDetailNewsProps) {
    const newNews = useMemo(() => {
        return news?.length ? news : []
    }, [])

    return (
        <Box {...rest}>
            <Stack
                direction={'row'}
                sx={{
                    div: {
                        padding: theme.spacing(1, 2),
                        cursor: 'pointer',
                        marginBottom: 2,
                        fontSize: '18px',
                        borderRadius: theme.spacing(0.75),
                        '&:hover': {
                            backgroundColor: theme.palette.primary.contrastText,
                        },
                    },
                }}
            >
                <Box>Latest</Box>
                <Box>Top</Box>
            </Stack>
            <Stack gap={2}>
                {newNews.map((article) => (
                    <ArticleItem key={article.id} article={article} />
                ))}
            </Stack>
        </Box>
    )
}
