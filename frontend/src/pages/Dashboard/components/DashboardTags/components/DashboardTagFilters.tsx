import { SearchFilter } from '@/components/Filters'
import { INewsFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface IDashboardTagFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardTagFilters({ setFilters }: IDashboardTagFiltersProps) {
    const { t } = useTranslation()

    const handleSearchReadingList = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue=""
                onSearchChange={handleSearchReadingList}
                placeholder={t('placeholder.search_title') as string}
                sx={{
                    width: 300,
                }}
            />
        </Box>
    )
}
