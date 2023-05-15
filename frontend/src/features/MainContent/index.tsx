import { Box, Grid } from '@mui/material'
import { ArticleContainer, Sidebar } from '..'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppDispatch } from '@/store'
import { getAllHashTagsPopular } from '@/store/hashTag/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'

export interface IMainContentProps {
    pGetAllTagsPopular: () => Promise<PayloadAction<unknown>>
}

function MainContent({ pGetAllTagsPopular }: IMainContentProps) {
    useEffect(() => {
        document.title = 'DEV Community'
        pGetAllTagsPopular()
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetAllTagsPopular: () => dispatch(getAllHashTagsPopular()),
    }
}

export default connect(null, mapDispatchToProps)(MainContent)
