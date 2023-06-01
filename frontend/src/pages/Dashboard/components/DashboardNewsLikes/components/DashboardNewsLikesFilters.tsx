import { SearchFilter } from '@/components/Filters'
import { INewsFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface IDashboardNewsLikesFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardNewsLikesFilters({
    setFilters,
}: IDashboardNewsLikesFiltersProps) {
    const { t } = useTranslation()
    const handleSearchNewsLikes = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue=""
                onSearchChange={handleSearchNewsLikes}
                placeholder={t('placeholder.search_title') as string}
                sx={{
                    width: 300,
                }}
            />
        </Box>
    )
}
