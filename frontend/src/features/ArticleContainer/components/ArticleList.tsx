import { EmptyList, SkeletonNewsList } from '@/components/Common'
import { INews } from '@/models'
import { Box, Grid } from '@mui/material'
import { useMemo } from 'react'
import { ArticleItem } from '.'
import { useTranslation } from 'react-i18next'

export interface IArticleListProps {
    articleList: INews[]
    loading: boolean
}

export function ArticleList({ loading, articleList }: IArticleListProps) {
    const { t } = useTranslation()

    const newArticleList = useMemo(() => {
        return articleList?.length ? articleList : []
    }, [articleList])

    return (
        <Box>
            {loading && <SkeletonNewsList />}
            {!newArticleList.length && !loading && (
                <EmptyList title={t('empty.no_news')} />
            )}
            {!!newArticleList.length && !loading && (
                <Grid container spacing={2}>
                    {newArticleList.map((news) => (
                        <Grid key={news.id} item lg={6} xs={12}>
                            <ArticleItem article={news} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}
