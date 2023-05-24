import { EmptyList, SkeletonNewsList } from '@/components/Common'
import { INews } from '@/models'
import { Box, Grid } from '@mui/material'
import { useMemo } from 'react'
import { ArticleItem } from '.'

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
                <Grid container spacing={2}>
                    {newArticleList.map((news) => (
                        <Grid key={news.id} item md={6}>
                            <ArticleItem article={news} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}
