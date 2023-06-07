import { EmptyList, NewsList, TitleContainerPage } from '@/components/Common'
import { INews, INewsFilters } from '@/models'
import { DashboardReadingListFilters } from '@/pages/Dashboard/components/DashboardReadingList/components'
import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TitleDashboard } from '..'

export interface IDashboardReadingListProps {
    saves: INews[]
    numSaves: number
}

export function DashboardReadingList({ saves, numSaves }: IDashboardReadingListProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INewsFilters>({
        search: '',
    })

    const newSaves = useMemo(() => {
        const searchSaves = saves.filter((n) => {
            if (!filters.search || filters.search === '') return true
            return (filters.search as string)
                .toLowerCase()
                .split(' ')
                .filter((x) => !!x)
                .some((w) => n.title.toLowerCase().includes(w))
        })

        return saves?.length && searchSaves.length ? searchSaves : []
    }, [saves, filters])

    return (
        <Box>
            <TitleContainerPage
                sx={{
                    marginBottom: 2,
                }}
            >
                <TitleDashboard
                    text={t('dashboard.reading_list') as string}
                    nums={numSaves}
                />
                <DashboardReadingListFilters setFilters={setFilters} />
            </TitleContainerPage>

            <Box>
                {newSaves.length === 0 && (
                    <EmptyList title={t('empty.no_news_reading')} />
                )}
                {newSaves.length > 0 && <NewsList newsList={newSaves} />}
            </Box>
        </Box>
    )
}
