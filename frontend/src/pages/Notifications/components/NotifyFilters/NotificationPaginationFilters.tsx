import { PaginationFilters } from '@/components/Filters'
import { INotifyFilters } from '@/models'
import { theme } from '@/utils'
import { Box, Stack } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface INotificationPaginationFiltersProps {
    filters: INotifyFilters
    setFilters: Dispatch<SetStateAction<INotifyFilters>>
    total: number
}

export function NotificationPaginationFilters({
    filters,
    setFilters,
    total,
}: INotificationPaginationFiltersProps) {
    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }))
    }

    return (
        <Box width="100%" padding={theme.spacing(2, 0)}>
            <Stack width={'100%'} direction={'row'} justifyContent={'center'}>
                <PaginationFilters
                    page={filters.page}
                    total={Math.ceil(total / filters.limit)}
                    onPageChange={handlePageChange}
                />
            </Stack>
        </Box>
    )
}
