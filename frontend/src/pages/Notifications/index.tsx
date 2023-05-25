import { TitlePage } from '@/components/Common'
import { ALL } from '@/consts'
import { IFilters, INotify, INotifyFilters } from '@/models'
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
import { connect } from 'react-redux'

export interface INotificationsProps {
    pNotifications: INotify[]
    pNotificationsTotal: number
    pGetNotifications: (filters: IFilters) => Promise<PayloadAction<unknown>>
}

export function Notifications({
    pNotifications,
    pNotificationsTotal,
    pGetNotifications,
}: INotificationsProps) {
    const [filters, setFilters] = useState<INotifyFilters>({
        page: 1,
        limit: 8,
        search: '',
        isRead: ALL,
    })

    useEffect(() => {
        document.title = 'Notifications - DEV Community'
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                const newFilters: IFilters = {
                    page: filters.page,
                    limit: filters.limit,
                    search: filters.search,
                }
                await pGetNotifications(newFilters)
            } catch (error) {
                enqueueSnackbar((error as Error).message, {
                    variant: 'error',
                })
            }
        })()
    }, [filters])

    return (
        <Box>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <TitlePage>Notifications</TitlePage>
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
                    <NotificationPaginationFilters
                        filters={filters}
                        setFilters={setFilters}
                        total={pNotificationsTotal}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pNotifications: state.notify.notificationsFilter,
        pNotificationsTotal: state.notify.totalFilter,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetNotifications: (filters: IFilters) => dispatch(getNotifiesFilters(filters)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
