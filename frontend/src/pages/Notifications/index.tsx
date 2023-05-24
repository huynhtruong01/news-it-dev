import { TitlePage } from '@/components/Common'
import { Box, Grid } from '@mui/material'
import { NotificationList } from '@/pages/Notifications/components'
import { useEffect } from 'react'

export function Notifications() {
    useEffect(() => {
        document.title = 'Notifications - DEV Community'
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
                    <NotificationList />
                </Grid>
            </Grid>
        </Box>
    )
}
