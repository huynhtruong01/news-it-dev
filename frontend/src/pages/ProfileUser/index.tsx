import { userApi } from '@/api'
import { IsFollow } from '@/enums'
import { IFollow, IUser } from '@/models'
import { ProfileInfoItem, ProfileLeftItem, ProfileNews } from '@/pages/Profile/components'
import { ProfileUserNumFollow } from '@/pages/ProfileUser/components'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { formatDate, theme } from '@/utils'
import ArticleIcon from '@mui/icons-material/Article'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import TagIcon from '@mui/icons-material/Tag'
import {
    Avatar,
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    Typography,
    alpha,
    Grid,
} from '@mui/material'
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
                    setFollowed(IsFollow.FOLLOWING)
                    setFollowers(followers + 1)
                    await userApi.followUser(user.id)
                } else {
                    setFollowed(IsFollow.FOLLOW)
                    setFollowers(followers === 0 ? 0 : followers - 1)
                    await userApi.unfollowUser(user.id)
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
                                    padding: theme.spacing(1.5, 2),
                                    backgroundColor:
                                        followed === IsFollow.FOLLOW
                                            ? theme.palette.primary.light
                                            : alpha(theme.palette.secondary.dark, 0.05),
                                    fontWeight: 500,
                                    lineHeight: 1,
                                    borderRadius: theme.spacing(0.75),
                                    color:
                                        followed === IsFollow.FOLLOW
                                            ? theme.palette.primary.contrastText
                                            : theme.palette.secondary.dark,
                                    boxShadow: `0 0 1px ${
                                        followed === IsFollow.FOLLOW
                                            ? 'transparent'
                                            : theme.palette.secondary.main
                                    }`,

                                    '&:hover': {
                                        backgroundColor:
                                            followed === IsFollow.FOLLOW
                                                ? theme.palette.primary.dark
                                                : alpha(
                                                      theme.palette.secondary.dark,
                                                      0.1
                                                  ),
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
                    </Grid>
                    <Grid item md={8}>
                        <ProfileNews news={newNews} />
                    </Grid>
                </Grid>
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
