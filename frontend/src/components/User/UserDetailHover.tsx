import { DEFAULT_LANGUAGES } from '@/consts'
import { IsFollow } from '@/enums'
import { useCheckSelf, useLinkUser } from '@/hooks'
import { IFollow, IFollowNotify, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { followUser, unfollowUser } from '@/store/user'
import { followUserApi, getProfile, unfollowUserApi } from '@/store/user/thunkApi'
import { formatDate, shortDateFormat, theme } from '@/utils'
import {
    Avatar,
    Box,
    BoxProps,
    Button,
    Paper,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export interface IUserDetailHoverProps extends BoxProps {
    user: IUser
    pUser: IUser | null
    pSocket: Socket | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
    pFollowUser: (data: IUser) => void
    pUnFollowUser: (data: IUser) => void
    pFollowUserApi: (data: IFollowNotify) => Promise<PayloadAction<unknown>>
    pUnFollowUserApi: (data: IUser) => Promise<PayloadAction<unknown>>
    pLanguage: string
}

function UserDetailHover({
    user,
    pUser,
    pSocket,
    pSetShowModalAuth,
    pFollowUser,
    pUnFollowUser,
    pFollowUserApi,
    pUnFollowUserApi,
    pLanguage,
    ...rest
}: IUserDetailHoverProps) {
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)
    const linkUser = useLinkUser(user)
    const checkSelf = useCheckSelf(user)
    const { t } = useTranslation()

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
                    pFollowUser(user)
                    await pFollowUserApi({
                        socket: pSocket as Socket,
                        user: pUser,
                        userFollow: user,
                    })
                } else {
                    pUnFollowUser(user)
                    await pUnFollowUserApi(user)
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            {...rest}
            component={Paper}
            elevation={1}
            borderTop={`2rem solid ${
                user.bandingColor ? user.bandingColor : theme.palette.primary.dark
            }`}
        >
            <Box>
                <Stack
                    direction={'row'}
                    alignItems={'flex-end'}
                    gap={0.5}
                    sx={{
                        transform: 'translateY(-30%)',
                    }}
                >
                    <Avatar
                        src={user.avatar as string}
                        alt={user.username}
                        sx={{
                            width: 48,
                            height: 48,
                        }}
                    />
                    <Typography
                        sx={{
                            a: {
                                padding: theme.spacing(0, 0.5),
                                fontSize: theme.typography.h6,
                                fontWeight: 700,
                                '&:hover': {
                                    color: theme.palette.primary.main,
                                    background: 'none',
                                },
                            },
                        }}
                    >
                        <Link to={linkUser}>{user.username}</Link>
                    </Typography>
                </Stack>

                {checkSelf && (
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            padding: theme.spacing(1.2, 0),
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
                                        : alpha(theme.palette.secondary.dark, 0.1),
                            },
                        }}
                        onClick={handleFollowClick}
                    >
                        {followed === IsFollow.FOLLOW
                            ? t('profile.follow')
                            : t('profile.following')}
                    </Button>
                )}
            </Box>

            <Box
                component="ul"
                sx={{
                    marginTop: 2,
                    li: {
                        marginBottom: 2,
                        color: theme.palette.secondary.main,
                        div: {
                            textTransform: 'uppercase',
                            fontSize: theme.typography.caption,
                            fontWeight: 700,
                        },
                        p: {
                            fontSize: '1rem',
                            color: theme.palette.secondary.main,
                        },
                    },
                }}
            >
                {user.bio && (
                    <Box component="li">
                        <Typography>{user.bio}</Typography>
                    </Box>
                )}
                {user.skillLanguages && (
                    <Box component="li">
                        <Box>{t('input.skill_languages')}</Box>
                        <Typography>{user.skillLanguages}</Typography>
                    </Box>
                )}
                {user.work && (
                    <Box component="li">
                        <Box>{t('input.work')}</Box>
                        <Typography>{user.work}</Typography>
                    </Box>
                )}
                <Box component="li">
                    <Box>{t('input.dated_join')}</Box>
                    <Typography>
                        {pLanguage === DEFAULT_LANGUAGES
                            ? shortDateFormat(user.dateJoined || new Date())
                            : formatDate(user.dateJoined || new Date(), 'MMM DD, YYYY')}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pSocket: state.socket.socket,
        pLanguage: state.common.languages,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailHover)
