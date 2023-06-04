import { TitlePage } from '@/components/Common'
import { ALL } from '@/consts'
import { INotify, INotifyFilters, ISetNotifications, IUser } from '@/models'
import {
    NotificationList,
    NotificationNavFilters,
    NotificationSearchFilters,
} from '@/pages/Notifications/components'
import { AppDispatch, AppState } from '@/store'
import { setNotificationFilters } from '@/store/notify'
import { Box, Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface INotificationsProps {
    pUser: IUser | null
    pNotifications: INotify[]
    pNotificationsTotal: number
    pSetNotificationsFilter: (data: ISetNotifications) => void
}

export function Notifications({
    pUser,
    pNotifications,
    pNotificationsTotal,
    pSetNotificationsFilter,
}: INotificationsProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INotifyFilters>({
        page: 1,
        limit: 8,
        search: '',
        isRead: ALL,
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (pUser) {
            document.title = `${t('title_document.notifications')} - ${t(
                'title_document.news_community'
            )}`
        } else {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        if (pUser?.id) {
            pSetNotificationsFilter({ filters, userId: pUser.id })
        }
    }, [filters])

    return (
        <Box
            sx={{
                maxWidth: 1024,
                margin: 'auto',
            }}
        >
            <Stack
                direction={{
                    md: 'row',
                    xs: 'column',
                }}
                justifyContent={{
                    md: 'space-between',
                    xs: 'center',
                }}
                alignItems={{
                    md: 'center',
                    xs: 'flex-start',
                }}
                gap={1.5}
                marginBottom={2}
                width={'100%'}
            >
                <TitlePage>
                    {t('notifications.title')} ({pNotificationsTotal})
                </TitlePage>
                <NotificationSearchFilters setFilters={setFilters} />
            </Stack>

            <Grid
                container
                spacing={2}
                sx={{
                    marginTop: 3,
                }}
            >
                <Grid
                    item
                    sx={{
                        width: {
                            md: '240px',
                            xs: '100%',
                        },
                    }}
                >
                    <NotificationNavFilters filters={filters} setFilters={setFilters} />
                </Grid>

                <Grid item xs={12} md>
                    <NotificationList notifications={pNotifications} />
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pNotifications: state.notify.notificationsFilter,
        pNotificationsTotal: state.notify.total,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetNotificationsFilter: (data: ISetNotifications) =>
            dispatch(setNotificationFilters(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
