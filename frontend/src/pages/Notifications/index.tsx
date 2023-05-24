import { TitlePage } from '@/components/Common'
import { Box, Grid } from '@mui/material'
import { NotificationList } from '@/pages/Notifications/components'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '@/store'
import { getNotifies } from '@/store/notify/thunkApi'
import { INotify } from '@/models'
import { PayloadAction } from '@reduxjs/toolkit'

export interface INotificationsProps {
    pNotifications: INotify[]
    pGetNotifications: () => Promise<PayloadAction<unknown>>
}

export function Notifications({
    pNotifications,
    pGetNotifications,
}: INotificationsProps) {
    useEffect(() => {
        document.title = 'Notifications - DEV Community'
        pGetNotifications()
    }, [])

    return (
        <Box>
            <Box>
                <TitlePage>Notifications</TitlePage>
            </Box>

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
                    <Box></Box>
                </Grid>
                <Grid item md>
                    <NotificationList notifications={pNotifications} />
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pNotifications: state.notify.notifications,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetNotifications: () => dispatch(getNotifies()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
