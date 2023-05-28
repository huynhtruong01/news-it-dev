import { SearchFilter } from '@/components/Filters'
import { INewsFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface IDashboardReadingListFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardReadingListFilters({
    setFilters,
}: IDashboardReadingListFiltersProps) {
    const handleSearchReadingList = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue=""
                onSearchChange={handleSearchReadingList}
                placeholder="Search title..."
                sx={{
                    width: 300,
                }}
            />
        </Box>
    )
}
