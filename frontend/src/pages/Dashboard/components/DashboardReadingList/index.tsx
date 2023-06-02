import { EmptyList, NewsList } from '@/components/Common'
import { INews, INewsFilters } from '@/models'
import { DashboardReadingListFilters } from '@/pages/Dashboard/components/DashboardReadingList/components'
import { Box, Stack } from '@mui/material'
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
            <Stack
                direction={{
                    md: 'row',
                    xs: 'column',
                }}
                justifyContent={{
                    md: 'space-between',
                    xs: 'center',
                }}
                alignItems={{
                    md: 'center',
                    xs: 'flex-start',
                }}
                gap={2}
                marginBottom={2}
                width={'100%'}
            >
                <TitleDashboard
                    text={t('dashboard.reading_list') as string}
                    nums={numSaves}
                />
                <DashboardReadingListFilters setFilters={setFilters} />
            </Stack>

            <Box>
                {newSaves.length === 0 && (
                    <EmptyList title={t('empty.no_news_reading')} />
                )}
                {newSaves.length && <NewsList newsList={newSaves} />}
            </Box>
        </Box>
    )
}
