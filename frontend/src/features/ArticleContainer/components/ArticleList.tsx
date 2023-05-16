import { INews } from '@/models'
import { Box, Stack } from '@mui/material'
import { ArticleItem } from '.'
import { useMemo } from 'react'
import { EmptyList, SkeletonNewsList } from '@/components/Common'

export interface IArticleListProps {
    articleList: INews[]
    loading: boolean
}

export function ArticleList({ loading, articleList }: IArticleListProps) {
    const newArticleList = useMemo(() => {
        return articleList?.length ? articleList : []
    }, [articleList])

    return (
        <Box>
            {loading && <SkeletonNewsList />}
            {!newArticleList.length && !loading && <EmptyList title="No news here" />}
            {!!newArticleList.length && !loading && (
                <Stack gap={2}>
                    {newArticleList.map((news) => (
                        <ArticleItem key={news.id} article={news} />
                    ))}
                </Stack>
            )}
        </Box>
    )
}
