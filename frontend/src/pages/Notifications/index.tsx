import { TitlePage } from '@/components/Common'
import { IFilters, INotifiesFilter, INotify, INotifyFilters, IUser } from '@/models'
import {
    NotificationList,
    NotificationNavFilters,
    NotificationPaginationFilters,
    NotificationSearchFilters,
} from '@/pages/Notifications/components'
import { AppDispatch, AppState } from '@/store'
import { getNotifiesFilters } from '@/store/notify/thunkApi'
import { Box, Grid, Stack } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface INotificationsProps {
    pUser: IUser | null
    pNotifications: INotify[]
    pNotificationsTotal: number
    pGetNotifications: (data: INotifiesFilter) => Promise<PayloadAction<unknown>>
}

export function Notifications({
    pUser,
    pNotifications,
    pNotificationsTotal,
    pGetNotifications,
}: INotificationsProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INotifyFilters>({
        page: 1,
        limit: 8,
        search: '',
    })

    useEffect(() => {
        document.title = 'Notifications - DEV Community'
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                const newFilters: IFilters = {
                    ...filters,
                }
                await pGetNotifications({
                    filters: newFilters,
                    userId: pUser?.id as number,
                })
            } catch (error) {
                enqueueSnackbar((error as Error).message, {
                    variant: 'error',
                })
            }
        })()
    }, [filters])

    return (
        <Box
            sx={{
                maxWidth: 1024,
                margin: 'auto',
            }}
        >
            <Stack direction={'row'} justifyContent={'space-between'}>
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
                        width: '240px',
                    }}
                >
                    <NotificationNavFilters filters={filters} setFilters={setFilters} />
                </Grid>

                <Grid item md>
                    {/* list */}
                    <NotificationList notifications={pNotifications || []} />

                    {/* pagination */}
                    {pNotificationsTotal > 0 && (
                        <NotificationPaginationFilters
                            filters={filters}
                            setFilters={setFilters}
                            total={pNotificationsTotal}
                        />
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pNotifications: state.notify.notificationsFilter,
        pNotificationsTotal: state.notify.totalFilter,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetNotifications: (data: INotifiesFilter) => dispatch(getNotifiesFilters(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
