import { SearchFilter } from '@/components/Filters'
import { INewsFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface IDashboardReadingListFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardReadingListFilters({
    setFilters,
}: IDashboardReadingListFiltersProps) {
    const { t } = useTranslation()

    const handleSearchReadingList = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    return (
        <Box width={'100%'}>
            <SearchFilter
                initValue=""
                onSearchChange={handleSearchReadingList}
                placeholder={t('placeholder.search_title') as string}
                sx={{
                    width: {
                        md: 300,
                        xs: '100%',
                    },
                }}
            />
        </Box>
    )
}
