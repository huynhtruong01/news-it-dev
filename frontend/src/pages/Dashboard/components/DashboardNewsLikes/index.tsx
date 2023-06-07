import { EmptyList, NewsList, TitleContainerPage } from '@/components/Common'
import { INews, INewsFilters } from '@/models'
import { DashboardNewsLikesFilters } from '@/pages/Dashboard/components/DashboardNewsLikes/components'
import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TitleDashboard } from '..'

export interface IDashboardNewsLikesProps {
    newsLikes: INews[]
    numLikes: number
}

export function DashboardNewsLikes({ newsLikes, numLikes }: IDashboardNewsLikesProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INewsFilters>({
        search: '',
    })

    const newNewsLikes = useMemo(() => {
        const searchNewsLikes = newsLikes.filter((n) => {
            if (!filters.search || filters.search === '') return true
            return (filters.search as string)
                .toLowerCase()
                .split(' ')
                .filter((x) => !!x)
                .some((w) => n.title.toLowerCase().includes(w))
        })

        return newsLikes?.length && searchNewsLikes.length ? searchNewsLikes : []
    }, [newsLikes, filters])

    return (
        <Box>
            <TitleContainerPage
                sx={{
                    marginBottom: 2,
                }}
            >
                <TitleDashboard
                    text={t('dashboard.news_likes') as string}
                    nums={numLikes}
                />
                <DashboardNewsLikesFilters setFilters={setFilters} />
            </TitleContainerPage>

            <Box>
                {newNewsLikes.length === 0 && (
                    <EmptyList title={t('empty.no_news_liked')} />
                )}
                {newNewsLikes?.length > 0 && <NewsList newsList={newNewsLikes} />}
            </Box>
        </Box>
    )
}
