import { userApi } from '@/api'
import { IsFollow } from '@/enums'
import { IFollow, IUser } from '@/models'
import { ProfileInfoItem, ProfileLeftItem, ProfileNews } from '@/pages/Profile/components'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { formatDate, theme } from '@/utils'
import ArticleIcon from '@mui/icons-material/Article'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import TagIcon from '@mui/icons-material/Tag'
import { Avatar, Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

export interface IProfileUserProps {
    pUser: IUser | null
    pSetShowModalAuth: (isShow: boolean) => void
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function ProfileUser({ pUser, pSetShowModalAuth, pGetProfile }: IProfileUserProps) {
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)
    const [user, setUser] = useState<IUser | null>(null)
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
                    setUser(res.data.user)
                } catch (error) {
                    throw new Error(error as string)
                }
            })()
        }
    }, [])

    useEffect(() => {
        if (Array.isArray(pUser?.following)) {
            const isFollowed = pUser?.following.find((t) => t.id === user?.id)
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
                    await userApi.followUser(user.id)
                    setFollowed(IsFollow.FOLLOWING)
                } else {
                    await userApi.unfollowUser(user.id)
                    setFollowed(IsFollow.FOLLOW)
                }

                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleShowModalAuth = () => {
        pSetShowModalAuth(true)
    }

    return user ? (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    height: 150,
                    backgroundColor: theme.palette.primary.dark,
                    borderRadius: theme.spacing(0.75),
                }}
            ></Box>

            <Stack
                component="header"
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: '1024px',
                    margin: 'auto',
                    marginTop: '-4rem',
                }}
            >
                <Box component={Paper} elevation={1}>
                    <Box
                        sx={{
                            position: 'relative',
                            paddingTop: 2,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-64px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <Avatar
                                src={user.avatar}
                                alt={user.username}
                                sx={{
                                    width: 128,
                                    height: 128,
                                    border: `10px solid ${theme.palette.primary.dark}`,
                                }}
                            />
                        </Box>
                        {!pUser?.id && (
                            <Button
                                variant="contained"
                                sx={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    borderRadius: theme.spacing(0.75),
                                    padding: theme.spacing(1, 2),
                                    backgroundColor: theme.palette.primary.light,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
                                }}
                                onClick={handleShowModalAuth}
                            >
                                Follow
                            </Button>
                        )}
                        {pUser?.id && (
                            <Button
                                variant="contained"
                                sx={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    borderRadius: theme.spacing(0.75),
                                    padding: theme.spacing(1, 2),
                                    backgroundColor: theme.palette.primary.light,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
                                }}
                                onClick={handleFollowClick}
                            >
                                {followed === IsFollow.FOLLOWING ? 'Following' : 'Follow'}
                            </Button>
                        )}
                    </Box>
                    <Box padding={theme.spacing(8, 3, 3)} textAlign="center">
                        <Typography
                            component="h1"
                            variant="h4"
                            fontWeight={700}
                            marginBottom={1}
                        >
                            {user.username}
                        </Typography>
                        {user.bio && (
                            <Typography
                                fontSize={'18px'}
                                sx={{
                                    width: '100%',
                                    maxWidth: '80%',
                                    margin: 'auto',
                                    marginBottom: 2,
                                }}
                            >
                                {user.bio}
                            </Typography>
                        )}
                        <Typography
                            sx={{
                                fontSize: theme.typography.body2,
                            }}
                        >
                            Joined on{' '}
                            {formatDate(user.dateJoined || new Date(), 'MMM DD, YYYY')}
                        </Typography>
                    </Box>
                    {user.work && (
                        <>
                            <Divider />
                            <Box padding={1.5} textAlign="center">
                                <Box padding={1.5}>
                                    <Box
                                        component="strong"
                                        sx={{
                                            fontSize: theme.typography.body2,
                                            fontWeight: 700,
                                        }}
                                    >
                                        Work
                                    </Box>
                                    <Typography>{user.work}</Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr',
                        gap: 2,
                    }}
                >
                    <Stack gap={2}>
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
                                icon={ArticleIcon}
                                text={`${user.newsCount || 0} news`}
                                marginBottom={2}
                            />
                            <ProfileInfoItem
                                icon={ChatBubbleOutlineIcon}
                                text={`${user.comments?.length || 0} comment written`}
                                marginBottom={2}
                            />
                            <ProfileInfoItem
                                icon={TagIcon}
                                text={`${user.hashTags?.length || 0} tags followed`}
                            />
                        </Box>
                    </Stack>
                    <Box>
                        <ProfileNews news={newNews} />
                    </Box>
                </Box>
            </Stack>
        </Box>
    ) : (
        <Box>Loading...</Box>
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
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)
