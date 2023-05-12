import { INews } from '@/models'
import { Box, Stack } from '@mui/material'
import { ArticleItem } from '.'
import { useMemo } from 'react'

export interface IArticleListProps {
    articleList: INews[]
}

export function ArticleList({ articleList }: IArticleListProps) {
    const newArticleList = useMemo(() => {
        return articleList?.length ? articleList : []
    }, [articleList])

    return (
        <Box>
            <Stack gap={2}>
                {newArticleList.map((news) => (
                    <ArticleItem key={news.id} article={news} />
                ))}
            </Stack>
        </Box>
    )
}
