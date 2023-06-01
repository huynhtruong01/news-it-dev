import { EmptyList } from '@/components/Common'
import { INotify } from '@/models'
import { NotificationItem } from '@/pages/Notifications/components'
import { Stack } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export interface INotificationListProps {
    notifications: INotify[]
}

export function NotificationList({ notifications }: INotificationListProps) {
    const { t } = useTranslation()

    const newNotifications = useMemo(() => {
        return notifications.length ? notifications : []
    }, [notifications])

    return (
        <Stack gap={2}>
            {newNotifications.length === 0 && (
                <EmptyList title={t('empty.no_notifications')} />
            )}
            {newNotifications.map((notify) => (
                <NotificationItem key={notify.id} notify={notify} />
            ))}
        </Stack>
    )
}
