import { SearchFilter } from '@/components/Filters'
import { IFiltersNewsSave } from '@/models'
import { Box, BoxProps, Stack } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface IReadingListFiltersProps extends BoxProps {
    setFilters: Dispatch<SetStateAction<IFiltersNewsSave>>
}

export function ReadingListFilters({ setFilters, ...rest }: IReadingListFiltersProps) {
    const handleSearchChange = (value: string) => {
        console.log('search value: ', value)
        setFilters((prev: IFiltersNewsSave) => ({ ...prev, search: value }))
    }

    // const handleFilterStatusChange = (value: string | number) => {
    //     console.log('filters:', value)
    // }

    return (
        <Box {...rest}>
            <Stack direction={'row'} gap={2}>
                {/* TODO: MAKE SELECT FILTERS */}
                {/* <SelectFilter
                    initValue={ALL}
                    label="Status"
                    selects={selectReadingList}
                    onFilterChange={handleFilterStatusChange}
                    width={120}
                /> */}
                <SearchFilter
                    initValue={''}
                    onSearchChange={handleSearchChange}
                    placeholder="Search news..."
                />
            </Stack>
        </Box>
    )
}
