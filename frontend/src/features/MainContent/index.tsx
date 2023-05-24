import { AppDispatch } from '@/store'
import { getAllHashTagsPopular } from '@/store/hashTag/thunkApi'
import { Grid, Box } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { ArticleContainer, Sidebar } from '..'
import { getProfile } from '@/store/user/thunkApi'

export interface IMainContentProps {
    pGetAllTagsPopular: () => Promise<PayloadAction<unknown>>
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function MainContent({ pGetAllTagsPopular, pGetProfile }: IMainContentProps) {
    useEffect(() => {
        document.title = 'DEV Community'
        pGetAllTagsPopular()
        pGetProfile()
    }, [])

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid
                    item
                    sx={{
                        width: '240px',
                    }}
                >
                    <Sidebar />
                </Grid>

                <Grid item md>
                    <ArticleContainer />
                </Grid>
            </Grid>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetAllTagsPopular: () => dispatch(getAllHashTagsPopular()),
        pGetProfile: () => dispatch(getProfile()),
    }
}

export default connect(null, mapDispatchToProps)(MainContent)
