import { INews } from '@/models'
import { Stack } from '@mui/material'
import * as React from 'react'
import NewsItem from '@/components/Common/NewsCommon/components/NewsItem'
import { EmptyList } from '..'

export interface INewsListProps {
    newsList: INews[]
}

export function NewsList({ newsList }: INewsListProps) {
    const newNews = React.useMemo(() => {
        return newsList.length ? newsList : []
    }, [newsList])

    return (
        <Stack gap={2}>
            {newNews.length === 0 && <EmptyList title="No news" />}
            {newNews.map((news) => (
                <NewsItem key={news.id} news={news} />
            ))}
        </Stack>
    )
}
