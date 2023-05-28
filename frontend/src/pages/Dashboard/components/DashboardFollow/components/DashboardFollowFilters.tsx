import { SearchFilter } from '@/components/Filters'
import { INewsFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface IDashboardFollowFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardFollowFilters({ setFilters }: IDashboardFollowFiltersProps) {
    const handleSearchFollow = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue=""
                onSearchChange={handleSearchFollow}
                placeholder="Search username or name..."
                sx={{
                    width: 300,
                }}
            />
        </Box>
    )
}
