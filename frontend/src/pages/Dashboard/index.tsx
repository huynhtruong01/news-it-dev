import { Seo } from '@/components/Common'
import { IHashTag, INews, IUser } from '@/models'
import {
    DashboardLeftList,
    DashboardNews,
    DashboardNewsLikes,
    DashboardReadingList,
    DashboardTags,
    SelectionDashboard,
} from '@/pages/Dashboard/components'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { Box, Grid, Typography } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardFollow, ModalPublicNews } from '@/pages/Dashboard/components'

export interface IDashboardProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function Dashboard({ pUser, pGetProfile }: IDashboardProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pUser) {
            pGetProfile()
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <Box>
            <Seo
                title={`${t('title_document.dashboard')} - ${t(
                    'title_document.news_community'
                )}`}
            />
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
                                    display: {
                                        md: 'block',
                                        xs: 'none',
                                    },
                                }}
                            >
                                <DashboardLeftList user={pUser} />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: {
                                        md: 'none',
                                        sm: 'block',
                                    },
                                }}
                            >
                                <SelectionDashboard />
                            </Grid>
                            <Grid item xs={12} md>
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
            <ModalPublicNews />
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
