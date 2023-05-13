import { SearchFilter } from '@/components/Filters'
import { IFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'

export interface ITagsFiltersProps {
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function TagsFilters({ setFilters }: ITagsFiltersProps) {
    const [searchVal, setSearchVal] = useState<string>('')

    const handleSearchChange = (value: string) => {
        setSearchVal(value)
        setFilters((prev: IFilters) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue={searchVal}
                onSearchChange={handleSearchChange}
                placeholder="Search for tag"
            />
        </Box>
    )
}
