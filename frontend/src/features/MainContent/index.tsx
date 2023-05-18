import { AppDispatch } from '@/store'
import { getAllHashTagsPopular } from '@/store/hashTag/thunkApi'
import { Grid, Box } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { ArticleContainer, Sidebar } from '..'

export interface IMainContentProps {
    pGetAllTagsPopular: () => Promise<PayloadAction<unknown>>
}

function MainContent({ pGetAllTagsPopular }: IMainContentProps) {
    useEffect(() => {
        document.title = 'DEV Community'
        pGetAllTagsPopular()
    }, [])

    return (
        <Box>
            <Grid
                container
                gap={2}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '240px 1fr',
                }}
            >
                <Grid item>
                    <Sidebar />
                </Grid>

                <Grid item>
                    <ArticleContainer />
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
