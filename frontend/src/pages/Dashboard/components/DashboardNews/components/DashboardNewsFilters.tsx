import { SelectFilter } from '@/components/Filters'
import { ALL } from '@/consts'
import { selectStatus } from '@/data'
import { INewsFilters, INewsStatus } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface IDashboardNewsFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardNewsFilters({ setFilters }: IDashboardNewsFiltersProps) {
    const handleStatusFilters = (value: string | number) => {
        if (value === ALL) {
            setFilters({})
            return
        }

        setFilters((prev) => ({ ...prev, status: value as INewsStatus }))
    }

    return (
        <Box>
            <SelectFilter
                label="Status"
                selects={selectStatus}
                onFilterChange={handleStatusFilters}
            />
        </Box>
    )
}
