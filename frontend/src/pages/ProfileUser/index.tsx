import { userApi } from '@/api'
import { SkeletonProfile } from '@/components/Common'
import { IsFollow } from '@/enums'
import { IFollow, IFollowNotify, IUser } from '@/models'
import {
    ProfileHeader,
    ProfileInfoItem,
    ProfileLeftItem,
    ProfileNews,
} from '@/pages/Profile/components'
import { ProfileUserNumFollow } from '@/pages/ProfileUser/components'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { followUser, unfollowUser } from '@/store/user'
import { followUserApi, getProfile, unfollowUserApi } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import TagIcon from '@mui/icons-material/Tag'
import { Box, Grid, Paper, Stack } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { IoNewspaperOutline } from 'react-icons/io5'
import { RiChat1Line } from 'react-icons/ri'
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
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)
    const [user, setUser] = useState<IUser | null>(null)
    const [followers, setFollowers] = useState<number>(0)
    const params = useParams()

    useEffect(() => {
        if (user) {
            document.title = `${user.username} - DEV Community`
        }
    }, [user])

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
        return user?.news?.length ? user.news : []
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
            <Box
                sx={{
                    width: '100%',
                    height: 150,
                    backgroundColor: theme.palette.primary.dark,
                }}
            ></Box>

            <Stack
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: '1024px',
                    margin: 'auto',
                    marginTop: '-4rem',
                }}
            >
                <ProfileHeader
                    user={user}
                    isFollow={true}
                    followed={followed}
                    onFollow={handleFollowClick}
                />

                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Stack gap={2}>
                            <ProfileUserNumFollow
                                numFollowed={followers}
                                numFollowing={user.numFollowing as number}
                            />

                            {user.skillLanguages && (
                                <ProfileLeftItem
                                    title={'Skills/Languages'}
                                    value={user.skillLanguages}
                                />
                            )}

                            {user.currentlyLearning && (
                                <ProfileLeftItem
                                    title={'Currently Learning'}
                                    value={user.currentlyLearning}
                                />
                            )}

                            <Box component={Paper} elevation={1} padding={2}>
                                <ProfileInfoItem
                                    icon={IoNewspaperOutline}
                                    text={`${user.newsCount || 0} news published`}
                                    marginBottom={2}
                                />
                                <ProfileInfoItem
                                    icon={RiChat1Line}
                                    text={`${
                                        user.comments?.length || 0
                                    } comments written`}
                                    marginBottom={2}
                                />
                                <ProfileInfoItem
                                    icon={TagIcon}
                                    text={`${user.hashTags?.length || 0} tags followed`}
                                />
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item md={8}>
                        <ProfileNews news={newNews} />
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
