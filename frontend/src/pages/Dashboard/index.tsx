import { INews, IUser } from '@/models'
import {
    DashboardLeftList,
    DashboardNews,
    DashboardNewsLikes,
    DashboardReadingList,
    DashboardTags,
} from '@/pages/Dashboard/components'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { Box, Typography, Grid } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { DashboardFollow } from './components/DashboardFollow'

export interface IDashboardProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function Dashboard({ pUser, pGetProfile }: IDashboardProps) {
    useEffect(() => {
        document.title = 'Dashboard - DEV Community'
        // FETCH USER PROFILE
        pGetProfile()
    }, [])

    return (
        <Box>
            <Box>
                <Box marginBottom={2}>
                    <Typography component="h1" variant="h4" fontWeight={700}>
                        Dashboard
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {pUser && (
                        <>
                            <Grid
                                item
                                sx={{
                                    width: '240px',
                                }}
                            >
                                <DashboardLeftList user={pUser} />
                            </Grid>
                            <Grid item md>
                                <Routes>
                                    <Route
                                        index
                                        element={
                                            <DashboardNews
                                                newsList={pUser.news as INews[]}
                                                newsCount={pUser.newsCount as number}
                                            />
                                        }
                                    />
                                    <Route
                                        path="followers"
                                        element={
                                            <DashboardFollow
                                                title={'Followers'}
                                                follows={pUser.followers as IUser[]}
                                                numFollows={pUser.numFollowers as number}
                                            />
                                        }
                                    />
                                    <Route
                                        path="following"
                                        element={
                                            <DashboardFollow
                                                title={'Following'}
                                                follows={pUser.following as IUser[]}
                                                numFollows={pUser.numFollowing as number}
                                            />
                                        }
                                    />
                                    <Route
                                        path="tags"
                                        element={<DashboardTags tags={pUser.hashTags} />}
                                    />
                                    <Route
                                        path="likes"
                                        element={
                                            <DashboardNewsLikes
                                                newsLikes={pUser.newsLikes as INews[]}
                                            />
                                        }
                                    />
                                    <Route
                                        path="reading-list"
                                        element={
                                            <DashboardReadingList
                                                saves={pUser.saves as INews[]}
                                            />
                                        }
                                    />
                                </Routes>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Box>
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
        pGetProfile: () => dispatch(getProfile()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
