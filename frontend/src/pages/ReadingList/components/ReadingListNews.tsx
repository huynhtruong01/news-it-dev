import { INews } from '@/models'
import { Box, BoxProps, Paper } from '@mui/material'
import { ReadingListNewsItem } from '.'
import { EmptyList, SkeletonReadingList } from '@/components/Common'
import { useTranslation } from 'react-i18next'

export interface IReadingListNewsProps extends BoxProps {
    news: INews[]
    loading?: boolean
}

export function ReadingListNews({ news, loading }: IReadingListNewsProps) {
    const { t } = useTranslation()

    return (
        <>
            {loading && <SkeletonReadingList quantities={4} />}
            {!loading && news.length === 0 && (
                <EmptyList title={t('empty.no_news_reading_list')} />
            )}
            {!loading && news.length > 0 && (
                <Box component={Paper} elevation={1} paddingBottom={2}>
                    {news.map((article) => (
                        <ReadingListNewsItem key={article.id} article={article} />
                    ))}
                </Box>
            )}
        </>
    )
}
