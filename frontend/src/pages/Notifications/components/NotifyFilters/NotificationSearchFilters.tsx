import { SearchFilter } from '@/components/Filters'
import { INotifyFilters } from '@/models'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface INotificationSearchFiltersProps {
    setFilters: Dispatch<SetStateAction<INotifyFilters>>
}

export function NotificationSearchFilters({
    setFilters,
}: INotificationSearchFiltersProps) {
    const { t } = useTranslation()
    const handleSearchNotify = (value: string) => {
        setFilters((prev) => ({ ...prev, page: 1, search: !value ? '' : value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue={''}
                onSearchChange={handleSearchNotify}
                placeholder={t('placeholder.search_title') as string}
                width={300}
            />
        </Box>
    )
}
