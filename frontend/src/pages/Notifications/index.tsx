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
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<INotifyFilters>({
        page: 1,
        limit: 8,
        search: '',
    })

    useEffect(() => {
        document.title = `${t('title_document.notifications')} - ${t(
            'title_document.news_community'
        )}`
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
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
            setLoading(false)
        })()
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
                    {/* list */}
                    <NotificationList
                        loading={loading}
                        notifications={pNotifications || []}
                    />

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
