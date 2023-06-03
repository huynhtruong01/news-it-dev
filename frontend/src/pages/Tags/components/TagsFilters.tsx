import { SearchFilter } from '@/components/Filters'
import { IFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface ITagsFiltersProps {
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function TagsFilters({ filters, setFilters }: ITagsFiltersProps) {
    const { t } = useTranslation()
    const handleSearchChange = (value: string) => {
        setFilters((prev: IFilters) => ({ ...prev, search: value }))
    }

    return (
        <Box
            width={{
                md: 'auto',
                xs: '100%',
            }}
        >
            <SearchFilter
                initValue={filters?.search as string}
                onSearchChange={handleSearchChange}
                placeholder={t('placeholder.search_tag') as string}
                width={{
                    md: 'auto',
                    xs: '100%',
                }}
            />
        </Box>
    )
}
