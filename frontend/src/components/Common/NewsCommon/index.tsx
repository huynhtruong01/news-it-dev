import NewsItem from '@/components/Common/NewsCommon/components/NewsItem'
import { INews, IUser } from '@/models'
import { Stack } from '@mui/material'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyList, SkeletonNewsList } from '..'

export interface INewsListProps {
    newsList: INews[]
    user?: IUser
    loading?: boolean
}

export function NewsList({ newsList, user, loading }: INewsListProps) {
    const { t } = useTranslation()

    const newNews = React.useMemo(() => {
        return newsList?.length ? newsList : []
    }, [newsList])

    return (
        <Stack gap={2}>
            {loading && <SkeletonNewsList columns={1} noImage />}
            {!loading && newNews.length === 0 && <EmptyList title={t('empty.no_news')} />}
            {!loading &&
                newNews.map((news) => <NewsItem key={news.id} news={news} user={user} />)}
        </Stack>
    )
}
