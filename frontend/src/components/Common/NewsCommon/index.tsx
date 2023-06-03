import { INews } from '@/models'
import { Stack } from '@mui/material'
import * as React from 'react'
import NewsItem from '@/components/Common/NewsCommon/components/NewsItem'
import { EmptyList, SkeletonNewsList } from '..'
import { useTranslation } from 'react-i18next'

export interface INewsListProps {
    newsList: INews[]
    loading?: boolean
}

export function NewsList({ newsList, loading }: INewsListProps) {
    const { t } = useTranslation()

    const newNews = React.useMemo(() => {
        return newsList?.length ? newsList : []
    }, [newsList])

    return (
        <Stack gap={2}>
            {loading && <SkeletonNewsList />}
            {!loading && newNews.length === 0 && <EmptyList title={t('empty.no_news')} />}
            {!loading && newNews.map((news) => <NewsItem key={news.id} news={news} />)}
        </Stack>
    )
}
