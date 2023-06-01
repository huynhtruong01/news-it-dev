import { IHashTag, INews, IUser } from '@/models'
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
import { useTranslation } from 'react-i18next'

export interface IDashboardProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function Dashboard({ pUser, pGetProfile }: IDashboardProps) {
    const { t } = useTranslation()
    useEffect(() => {
        document.title = 'Dashboard - DEV Community'
        pGetProfile()
    }, [])

    return (
        <Box>
            <Box>
                <Box marginBottom={2}>
                    <Typography component="h1" variant="h4" fontWeight={700}>
                        {t('dashboard.dashboard')}
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
                                                title={t('dashboard.followers') as string}
                                                follows={pUser.followers as IUser[]}
                                                numFollows={pUser.numFollowers as number}
                                            />
                                        }
                                    />
                                    <Route
                                        path="following"
                                        element={
                                            <DashboardFollow
                                                title={t('dashboard.following') as string}
                                                follows={pUser.following as IUser[]}
                                                numFollows={pUser.numFollowing as number}
                                            />
                                        }
                                    />
                                    <Route
                                        path="tags"
                                        element={
                                            <DashboardTags
                                                tags={pUser.hashTags as IHashTag[]}
                                                numTags={pUser.hashTags?.length || 0}
                                            />
                                        }
                                    />
                                    <Route
                                        path="likes"
                                        element={
                                            <DashboardNewsLikes
                                                newsLikes={pUser.newsLikes as INews[]}
                                                numLikes={pUser.newsLikes?.length || 0}
                                            />
                                        }
                                    />
                                    <Route
                                        path="reading-list"
                                        element={
                                            <DashboardReadingList
                                                saves={pUser.saves as INews[]}
                                                numSaves={pUser.saves?.length || 0}
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
