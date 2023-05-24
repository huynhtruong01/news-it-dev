import { TitlePage } from '@/components/Common'
import { Box, Grid } from '@mui/material'
import { NotificationList } from '@/pages/Notifications/components'
import { useEffect } from 'react'

// export interface ISearchNewsProps {}

export function SearchNews() {
    useEffect(() => {
        document.title = 'Search Results for'
    }, [])

    return (
        <Box>
            <Box>
                <TitlePage>Search</TitlePage>
            </Box>

            <Grid
                container
                spacing={2}
                sx={{
                    marginTop: 2,
                }}
            >
                <Grid
                    item
                    sx={{
                        width: '240px',
                    }}
                ></Grid>
                <Grid item md>
                    <NotificationList />
                </Grid>
            </Grid>
        </Box>
    )
}
