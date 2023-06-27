import { userApi } from '@/api'
import { Seo, SkeletonProfile } from '@/components/Common'
import { COLOR_WHITE } from '@/consts'
import { IsFollow, Status } from '@/enums'
import { IFollow, IFollowNotify, IUser } from '@/models'
import {
    ProfileHeader,
    ProfileInfo,
    ProfileLeftItem,
    ProfileNews,
} from '@/pages/Profile/components'
import { ProfileUserNumFollow } from '@/pages/ProfileUser/components'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { followUser, unfollowUser } from '@/store/user'
import { followUserApi, getProfile, unfollowUserApi } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, Grid, Stack } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export interface IProfileUserProps {
    pUser: IUser | null
    pSocket: Socket | null
    pSetShowModalAuth: (isShow: boolean) => void
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pFollowUser: (data: IUser) => void
    pUnFollowUser: (data: IUser) => void
    pFollowUserApi: (data: IFollowNotify) => Promise<PayloadAction<unknown>>
    pUnFollowUserApi: (data: IUser) => Promise<PayloadAction<unknown>>
}

function ProfileUser({
    pSocket,
    pUser,
    pSetShowModalAuth,
    pGetProfile,
    pFollowUser,
    pUnFollowUser,
    pFollowUserApi,
    pUnFollowUserApi,
}: IProfileUserProps) {
    const { t } = useTranslation()
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)
    const [user, setUser] = useState<IUser | null>(null)
    const [followers, setFollowers] = useState<number>(0)
    const params = useParams()

    useEffect(() => {
        if (pUser?.id) {
            pGetProfile()
        }

        if (params.username) {
            ;(async () => {
                try {
                    const res = await userApi.getUserByUsername(params.username as string)
                    setFollowers(res.data.user.numFollowers)
                    setUser(res.data.user)
                } catch (error) {
                    throw new Error(error as string)
                }
            })()
        }
    }, [])

    useEffect(() => {
        if (Array.isArray(pUser?.following)) {
            const isFollowed = pUser?.following?.find((t) => t.id === user?.id)
            if (isFollowed) {
                setFollowed(IsFollow.FOLLOWING)
                return
            }

            setFollowed(IsFollow.FOLLOW)
            return
        }

        setFollowed(IsFollow.FOLLOW)
    }, [pUser, user])

    const newNews = useMemo(() => {
        return user?.news?.length
            ? user.news
                  .filter((n) => n.status !== Status.DRAFT)
                  .sort(
                      (a, b) =>
                          new Date(b.createdAt || Date.now()).getTime() -
                          new Date(a.createdAt || Date.now()).getTime()
                  )
            : []
    }, [user])

    const handleFollowClick = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (user?.id) {
                if (followed === IsFollow.FOLLOW) {
                    setFollowers(followers + 1)
                    pFollowUser(user)

                    await pFollowUserApi({
                        socket: pSocket as Socket,
                        user: pUser,
                        userFollow: user,
                    })
                } else {
                    setFollowers(followers === 0 ? 0 : followers - 1)
                    pUnFollowUser(user)
                    await pUnFollowUserApi(user)
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return user ? (
        <Box>
            {user && (
                <Seo
                    title={`${user.username} - ${t('title_document.news_community')}`}
                    url={window.location.href}
                    image={user.avatar as string}
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
                        user?.bandingColor !== COLOR_WHITE
                            ? user?.bandingColor
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
                <ProfileHeader
                    user={user}
                    isFollow={true}
                    followed={followed}
                    onFollow={handleFollowClick}
                />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Stack gap={2}>
                            <ProfileUserNumFollow
                                numFollowed={followers}
                                numFollowing={user.numFollowing as number}
                            />

                            {user.skillLanguages && (
                                <ProfileLeftItem
                                    title={t('input.skill_languages')}
                                    value={user.skillLanguages}
                                />
                            )}

                            {user.currentlyLearning && (
                                <ProfileLeftItem
                                    title={t('input.currently_learning')}
                                    value={user.currentlyLearning}
                                />
                            )}

                            <ProfileInfo
                                numNews={user.newsCount as number}
                                numComments={(user.comments?.length || 0) as number}
                                numTag={user.hashTags?.length as number}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ProfileNews news={newNews} user={user} />
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
        pSocket: state.socket.socket,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
        pFollowUser: (data: IUser) => dispatch(followUser(data)),
        pUnFollowUser: (data: IUser) => dispatch(unfollowUser(data)),
        pFollowUserApi: (data: IFollowNotify) => dispatch(followUserApi(data)),
        pUnFollowUserApi: (data: IUser) => dispatch(unfollowUserApi(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)
