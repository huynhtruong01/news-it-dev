import { notifyFilters } from '@/data'
import { INotifyFilters, INotifyRead } from '@/models'
import { theme } from '@/utils'
import { Box, Stack, alpha } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface INotificationNavFiltersProps {
    filters: INotifyFilters
    setFilters: Dispatch<SetStateAction<INotifyFilters>>
}

export function NotificationNavFilters({
    filters,
    setFilters,
}: INotificationNavFiltersProps) {
    const handleNavFilters = (value: INotifyRead) => {
        setFilters((prev) => ({ ...prev, isRead: value }))
    }

    return (
        <Box>
            <Stack
                gap={0.5}
                component="ul"
                sx={{
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
                {notifyFilters.map((notify) => (
                    <Box
                        key={notify.value}
                        component="li"
                        sx={{
                            backgroundColor:
                                filters.isRead === notify.value
                                    ? alpha(theme.palette.primary.dark, 0.1)
                                    : 'transparent',
                            color:
                                filters.isRead === notify.value
                                    ? theme.palette.primary.dark
                                    : theme.palette.secondary.main,
                            fontWeight: filters.isRead === notify.value ? 700 : 400,
                        }}
                        onClick={() => handleNavFilters(notify.value as INotifyRead)}
                    >
                        {notify.name}
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
