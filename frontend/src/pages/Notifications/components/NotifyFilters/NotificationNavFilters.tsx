import { SelectFilter } from '@/components/Filters'
import { ALL } from '@/consts'
import { notifyFilters } from '@/data'
import { INotifyFilters, INotifyRead } from '@/models'
import { theme } from '@/utils'
import { Box, Stack, alpha } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface INotificationNavFiltersProps {
    filters: INotifyFilters
    setFilters: Dispatch<SetStateAction<INotifyFilters>>
}

export function NotificationNavFilters({
    filters,
    setFilters,
}: INotificationNavFiltersProps) {
    const { t } = useTranslation()
    const handleNavFilters = (value: INotifyRead | string | number) => {
        const newFilters = { ...filters }
        if (typeof value === 'number') {
            delete newFilters.type
            setFilters({ ...newFilters, isRead: value as INotifyRead, page: 1 })
            return
        }

        delete newFilters.isRead
        setFilters({ ...newFilters, type: value, page: 1 })
    }

    return (
        <Box>
            <Stack
                gap={0.5}
                component="ul"
                sx={{
                    display: {
                        md: 'flex',
                        xs: 'none',
                    },
                    li: {
                        padding: theme.spacing(1.1, 1),
                        cursor: 'pointer',
                        borderRadius: theme.spacing(0.75),

                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                            color: theme.palette.primary.dark,
                        },
                    },
                }}
            >
                <Box
                    component="li"
                    sx={{
                        backgroundColor:
                            filters.isRead === ALL
                                ? alpha(theme.palette.primary.dark, 0.1)
                                : 'transparent',
                        color:
                            filters.isRead === ALL
                                ? theme.palette.primary.dark
                                : theme.palette.secondary.main,
                        fontWeight: filters.isRead === ALL ? 700 : 400,
                    }}
                    onClick={() => handleNavFilters(ALL)}
                >
                    {t('selects.all')}
                </Box>
                {notifyFilters.map((notify) => (
                    <Box
                        key={notify.value}
                        component="li"
                        sx={{
                            backgroundColor:
                                filters.isRead === notify.value ||
                                filters.type === notify.value
                                    ? alpha(theme.palette.primary.dark, 0.1)
                                    : 'transparent',
                            color:
                                filters.isRead === notify.value ||
                                filters.type === notify.value
                                    ? theme.palette.primary.dark
                                    : theme.palette.secondary.main,
                            fontWeight:
                                filters.isRead === notify.value ||
                                filters.type === notify.value
                                    ? 700
                                    : 400,
                        }}
                        onClick={() => handleNavFilters(notify.value as INotifyRead)}
                    >
                        {t(notify.name as string)}
                    </Box>
                ))}
            </Stack>

            <Box
                sx={{
                    display: {
                        md: 'none',
                        xs: 'block',
                    },
                }}
            >
                <SelectFilter
                    selects={notifyFilters}
                    label=""
                    onFilterChange={handleNavFilters}
                    width={'100%'}
                />
            </Box>
        </Box>
    )
}
