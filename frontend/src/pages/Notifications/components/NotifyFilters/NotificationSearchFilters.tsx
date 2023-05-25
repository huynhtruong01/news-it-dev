import { SearchFilter } from '@/components/Filters'
import { INotifyFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface INotificationSearchFiltersProps {
    setFilters: Dispatch<SetStateAction<INotifyFilters>>
}

export function NotificationSearchFilters({
    setFilters,
}: INotificationSearchFiltersProps) {
    const handleSearchNotify = (value: string) => {
        setFilters((prev) => ({ ...prev, page: 1, search: !value ? '' : value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue={''}
                onSearchChange={handleSearchNotify}
                placeholder={'Search title...'}
                width={300}
            />
        </Box>
    )
}
