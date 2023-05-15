import { userApi } from '@/api'
import { IsFollow } from '@/enums'
import { IFollow, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, BoxProps, Button, Paper, Stack, Typography } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface INewsSideRightUserProps extends BoxProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    user: IUser | null
    pSetShowModalAuth: (isShow: boolean) => void
}

function NewsSideRightUser({
    pUser,
    user,
    pGetProfile,
    pSetShowModalAuth,
    ...rest
}: INewsSideRightUserProps) {
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)

    const checkSelf = useMemo(() => {
        if (pUser?.id) {
            return pUser.id !== user?.id ? true : false
        }
        return true
    }, [pUser])

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
        return
    }, [pUser, user])

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

    return (
        user && (
            <Box
                {...rest}
                component={Paper}
                elevation={1}
                width={'100%'}
                padding={theme.spacing(0, 2, 2)}
                borderTop={`2rem solid ${theme.palette.primary.main}`}
                borderRadius={theme.spacing(0.75)}
            >
                <Box marginBottom={4}>
                    <Stack
                        direction={'row'}
                        alignItems={'flex-end'}
                        gap={1}
                        sx={{
                            transform: 'translateY(-40%)',
                        }}
                    >
                        <Box>
                            <Link to={`/profile/${user.username}`}>
                                <Avatar
                                    src={user.avatar}
                                    alt={user.username}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                    }}
                                />
                            </Link>
                        </Box>
                        <Typography
                            component="span"
                            fontSize={'20px'}
                            fontWeight={700}
                            sx={{
                                a: {
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                    },
                                },
                            }}
                        >
                            <Link to={`/profile/${user.username}`}>{user.username}</Link>
                        </Typography>
                    </Stack>
                    {checkSelf && (
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            onClick={handleFollowClick}
                        >
                            {followed === IsFollow.FOLLOW ? 'Follow' : 'Following'}
                        </Button>
                    )}
                </Box>

                <Box
                    component="ul"
                    sx={{
                        li: {
                            marginBottom: 2,
                            div: {
                                textTransform: 'uppercase',
                                fontSize: theme.typography.caption,
                                fontWeight: 700,
                            },
                        },
                    }}
                >
                    {user.bio && (
                        <Box component="li">
                            <Box>Bio</Box>
                            <Typography>{user.bio}</Typography>
                        </Box>
                    )}
                    {user.skillLanguages && (
                        <Box component="li">
                            <Box>Skill Languages</Box>
                            <Typography>{user.skillLanguages}</Typography>
                        </Box>
                    )}
                    {user.work && (
                        <Box component="li">
                            <Box>Work</Box>
                            <Typography>{user.work}</Typography>
                        </Box>
                    )}
                    <Box component="li">
                        <Box>Date Joined</Box>
                        <Typography>
                            {formatDate(user.dateJoined || new Date(), 'MMM DD, YYYY')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsSideRightUser)
