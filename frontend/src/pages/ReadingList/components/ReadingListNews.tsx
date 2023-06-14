import { INews } from '@/models'
import { Box, BoxProps, Paper } from '@mui/material'
import { ReadingListNewsItem, ModalUnsaveReading } from '.'
import { EmptyList, SkeletonReadingList } from '@/components/Common'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export interface IReadingListNewsProps extends BoxProps {
    news: INews[]
    loading?: boolean
}

export function ReadingListNews({ news, loading }: IReadingListNewsProps) {
    const { t } = useTranslation()
    const [articleUnSave, setArticleUnSave] = useState<INews | null>(null)

    return (
        <>
            {loading && <SkeletonReadingList quantities={4} />}
            {!loading && news.length === 0 && (
                <EmptyList title={t('empty.no_news_reading_list')} />
            )}
            {!loading && news.length > 0 && (
                <Box component={Paper} elevation={1} paddingBottom={2}>
                    {news.map((article) => (
                        <ReadingListNewsItem
                            key={article.id}
                            article={article}
                            setArticleUnSave={setArticleUnSave}
                        />
                    ))}
                </Box>
            )}
            {articleUnSave && (
                <ModalUnsaveReading
                    article={articleUnSave}
                    setArticleUnSave={setArticleUnSave}
                />
            )}
        </>
    )
}
