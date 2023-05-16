import { SearchFilter } from '@/components/Filters'
import { IFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface ITagsFiltersProps {
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function TagsFilters({ filters, setFilters }: ITagsFiltersProps) {
    const handleSearchChange = (value: string) => {
        setFilters((prev: IFilters) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue={filters?.search as string}
                onSearchChange={handleSearchChange}
                placeholder="Search for tag"
            />
        </Box>
    )
}
