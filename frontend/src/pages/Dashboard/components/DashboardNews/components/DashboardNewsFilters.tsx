import { SearchFilter, SelectFilter } from '@/components/Filters'
import { ALL } from '@/consts'
import { selectStatus } from '@/data'
import { INewsFilters, INewsStatus } from '@/models'
import { Stack } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface IDashboardNewsFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function DashboardNewsFilters({ setFilters }: IDashboardNewsFiltersProps) {
    const { t } = useTranslation()

    const handleStatusFilters = (value: string | number) => {
        if (value === ALL) {
            setFilters((prev: INewsFilters) => {
                const newFilters = { ...prev, status: value as typeof ALL }

                return newFilters
            })
            return
        }

        setFilters((prev: INewsFilters) => ({ ...prev, status: value as INewsStatus }))
    }

    const handleSearchFilters = (value: string | number) => {
        if (!value) {
            setFilters((prev: INewsFilters) => ({ ...prev, search: '' }))
            return
        }

        setFilters((prev: INewsFilters) => ({ ...prev, search: value as string }))
    }

    return (
        <Stack direction={'row'} gap={1.5} alignItems={'center'}>
            <SelectFilter
                label="Status"
                selects={selectStatus}
                onFilterChange={handleStatusFilters}
            />
            <SearchFilter
                initValue={''}
                onSearchChange={handleSearchFilters}
                placeholder={t('placeholder.search_title') as string}
                width={{
                    lg: 250,
                    md: 200,
                    xs: '100%',
                }}
            />
        </Stack>
    )
}
