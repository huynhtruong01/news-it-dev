import { NotificationItem } from '@/pages/Notifications/components'
import { Stack } from '@mui/material'

// export interface INotificationListProps {}

export function NotificationList() {
    return (
        <Stack gap={2}>
            {Array.from(new Array(5)).map((item, idx) => (
                <NotificationItem key={idx} />
            ))}
        </Stack>
    )
}
