import { Seo, TitleContainerPage, TitlePage } from '@/components/Common'
import { ALL } from '@/consts'
import { INotify, INotifyFilters, ISetNotifications, IUser } from '@/models'
import {
    ModalDeleteAllNotify,
    NotificationList,
    NotificationNavFilters,
    NotificationSearchFilters,
} from '@/pages/Notifications/components'
import { AppDispatch, AppState } from '@/store'
import { setNotificationFilters } from '@/store/notify'
import { getNotifies } from '@/store/notify/thunkApi'
import { Box, Grid } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ModalDeleteNotify } from '@/pages/Notifications/components'

export interface INotificationsProps {
    pUser: IUser | null
    pNotifications: INotify[]
    pNotificationsTotal: number
    pSetNotificationsFilter: (data: ISetNotifications) => void
    pGetNotifies: (id: number) => Promise<PayloadAction<unknown>>
}

export function Notifications({
    pUser,
    pNotifications,
    pNotificationsTotal,
    pSetNotificationsFilter,
    pGetNotifies,
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
        if (!pUser?.id) {
            navigate('/login')
            return
        }

        pGetNotifies(pUser.id)
    }, [])

    useEffect(() => {
        if (pUser?.id) {
            pSetNotificationsFilter({ filters, userId: pUser.id })
        }
    }, [filters])

    return (
        <>
            <Seo
                title={`${t('title_document.notifications')} - ${t(
                    'title_document.news_community'
                )}`}
            />
            <Box
                sx={{
                    maxWidth: 1024,
                    margin: 'auto',
                }}
            >
                <TitleContainerPage>
                    <TitlePage>
                        {t('notifications.title')} ({pNotificationsTotal})
                    </TitlePage>
                    <NotificationSearchFilters setFilters={setFilters} />
                </TitleContainerPage>

                <Grid
                    container
                    spacing={2}
                    sx={{
                        marginTop: {
                            md: 3,
                            xs: 0,
                        },
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
                        <NotificationNavFilters
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </Grid>

                    <Grid item xs={12} md>
                        <NotificationList notifications={pNotifications} />
                    </Grid>
                </Grid>
            </Box>

            <ModalDeleteNotify />
            <ModalDeleteAllNotify hasNotifies={!!pNotifications.length} />
        </>
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
        pGetNotifies: (userId: number) =>
            dispatch(getNotifies({ filters: { page: 1, limit: 100 }, userId })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
