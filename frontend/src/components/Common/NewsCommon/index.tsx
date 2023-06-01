import { INews } from '@/models'
import { Stack } from '@mui/material'
import * as React from 'react'
import NewsItem from '@/components/Common/NewsCommon/components/NewsItem'
import { EmptyList } from '..'
import { useTranslation } from 'react-i18next'

export interface INewsListProps {
    newsList: INews[]
}

export function NewsList({ newsList }: INewsListProps) {
    const { t } = useTranslation()

    const newNews = React.useMemo(() => {
        return newsList?.length ? newsList : []
    }, [newsList])

    return (
        <Stack gap={2}>
            {newNews.length === 0 && <EmptyList title={t('empty.no_news')} />}
            {newNews.map((news) => (
                <NewsItem key={news.id} news={news} />
            ))}
        </Stack>
    )
}
