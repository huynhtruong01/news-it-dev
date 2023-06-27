import { Seo, SkeletonProfile } from '@/components/Common'
import { COLOR_WHITE } from '@/consts'
import { Status } from '@/enums'
import { IUser } from '@/models'
import {
    ProfileHeader,
    ProfileInfo,
    ProfileLeftItem,
    ProfileNews,
} from '@/pages/Profile/components'
import { ProfileUserNumFollow } from '@/pages/ProfileUser/components'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, Grid, Stack } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface IProfileProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function Profile({ pUser, pGetProfile }: IProfileProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pUser) {
            pGetProfile()
        } else {
            navigate('/login')
        }
    }, [])

    const newNews = useMemo(() => {
        return pUser?.news?.length
            ? pUser.news
                  .filter((n) => n.status !== Status.DRAFT)
                  .sort(
                      (a, b) =>
                          new Date(b.createdAt || Date.now()).getTime() -
                          new Date(a.createdAt || Date.now()).getTime()
                  )
            : []
    }, [pUser])

    return pUser ? (
        <Box>
            {pUser && (
                <Seo
                    title={`${pUser?.username} - ${t('title_document.news_community')}`}
                    description=""
                    image={pUser.avatar as string}
                    url={window.location.href}
                />
            )}
            <Box
                sx={{
                    width: '100%',
                    height: {
                        md: 150,
                        xs: 100,
                    },
                    backgroundColor:
                        pUser?.bandingColor !== COLOR_WHITE
                            ? pUser?.bandingColor
                            : theme.palette.primary.dark,
                }}
            ></Box>

            <Stack
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: 1024,
                    margin: 'auto',
                    marginTop: '-4rem',
                    padding: {
                        md: 0,
                        xs: 1,
                    },
                }}
            >
                <ProfileHeader user={pUser as IUser} />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Stack gap={2}>
                            <ProfileUserNumFollow
                                numFollowed={pUser.numFollowers as number}
                                numFollowing={pUser.numFollowing as number}
                                linkFollowed={'/dashboard/followers'}
                                linkFollowing={`/dashboard/following`}
                            />

                            {pUser.skillLanguages && (
                                <ProfileLeftItem
                                    title={t('input.skill_languages')}
                                    value={pUser.skillLanguages}
                                />
                            )}

                            {pUser.currentlyLearning && (
                                <ProfileLeftItem
                                    title={t('input.currently_learning')}
                                    value={pUser.currentlyLearning}
                                />
                            )}

                            <ProfileInfo
                                numNews={pUser.newsCount as number}
                                numComments={(pUser.comments?.length || 0) as number}
                                numTag={pUser.hashTags?.length as number}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ProfileNews news={newNews} user={pUser} />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    ) : (
        <Box>
            <SkeletonProfile />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
