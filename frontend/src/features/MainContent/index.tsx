import { AppDispatch, AppState } from '@/store'
import { getAllHashTagsPopular } from '@/store/hashTag/thunkApi'
import { Grid, Box } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { ArticleContainer, Sidebar } from '..'
import { getProfile } from '@/store/user/thunkApi'
import { getNotifies } from '@/store/notify/thunkApi'
import { IUser } from '@/models'

export interface IMainContentProps {
    pUser: IUser | null
    pGetAllTagsPopular: () => Promise<PayloadAction<unknown>>
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pGetNotifies: (userId: number) => Promise<PayloadAction<unknown>>
}

function MainContent({
    pUser,
    pGetAllTagsPopular,
    pGetProfile,
    pGetNotifies,
}: IMainContentProps) {
    useEffect(() => {
        document.title = 'DEV Community'
        pGetAllTagsPopular()
        pGetProfile()
        pGetNotifies(pUser?.id as number)
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

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetAllTagsPopular: () => dispatch(getAllHashTagsPopular()),
        pGetProfile: () => dispatch(getProfile()),
        pGetNotifies: (userId: number) =>
            dispatch(getNotifies({ filters: { page: 1, limit: 100 }, userId })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)
