import { SearchFilter } from '@/components/Filters'
import { INewsFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface IDashboardNewsLikesFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardNewsLikesFilters({
    setFilters,
}: IDashboardNewsLikesFiltersProps) {
    const handleSearchNewsLikes = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue=""
                onSearchChange={handleSearchNewsLikes}
                placeholder="Search title..."
                sx={{
                    width: 300,
                }}
            />
        </Box>
    )
}
