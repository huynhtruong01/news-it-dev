import { Box, Grid } from '@mui/material'
import { ArticleContainer, Sidebar } from '..'
import { useEffect } from 'react'

export function MainContent() {
    useEffect(() => {
        document.title = 'DEV Community'
    }, [])

    return (
        <Box component="section" width={'100%'}>
            <Grid
                container
                gap={2}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '240px 2fr 1fr',
                }}
            >
                <Grid item>
                    <Sidebar />
                </Grid>
                <Grid item>
                    <ArticleContainer />
                </Grid>
                <Grid item>
                    <Box>Right sidebar</Box>
                </Grid>
            </Grid>
        </Box>
    )
}
