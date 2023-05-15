import { IUser } from '@/models'
import {
    DashboardLeftList,
    DashboardNews,
    DashboardReadingList,
    DashboardTags,
} from '@/pages/Dashboard/components'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { Box, Typography } from '@mui/material'
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

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '240px 1fr',
                        gap: 2,
                    }}
                >
                    {pUser && (
                        <>
                            <Box>
                                <DashboardLeftList user={pUser} />
                            </Box>
                            <Box>
                                <Routes>
                                    <Route
                                        index
                                        element={<DashboardNews newsList={pUser.news} />}
                                    />
                                    <Route
                                        path="followers"
                                        element={
                                            <DashboardFollow follows={pUser.followers} />
                                        }
                                    />
                                    <Route
                                        path="following"
                                        element={
                                            <DashboardFollow follows={pUser.following} />
                                        }
                                    />
                                    <Route
                                        path="tags"
                                        element={<DashboardTags tags={pUser.hashTags} />}
                                    />
                                    <Route
                                        path="reading-list"
                                        element={
                                            <DashboardReadingList saves={pUser.saves} />
                                        }
                                    />
                                </Routes>
                            </Box>
                        </>
                    )}
                </Box>
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
