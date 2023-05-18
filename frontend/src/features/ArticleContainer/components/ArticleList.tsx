import { EmptyList, SkeletonNewsList } from '@/components/Common'
import { INews } from '@/models'
import { Box } from '@mui/material'
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
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 3,
                    }}
                >
                    {newArticleList.map((news) => (
                        <ArticleItem key={news.id} article={news} />
                    ))}
                </Box>
            )}
        </Box>
    )
}
