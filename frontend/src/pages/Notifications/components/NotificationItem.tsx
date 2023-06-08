import { newsApi, notifyApi } from '@/api'
import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import {
    IHashTag,
    INews,
    INewsActions,
    INotify,
    INotifyUpdateRead,
    IUser,
} from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { likeNewsApi } from '@/store/news/thunkApi'
import { readUserNotify } from '@/store/notify'
import { likeNews, saveNews, unlikeNews, unsaveNews } from '@/store/user'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Avatar, Box, Button, Paper, Stack, Typography, alpha } from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { NotifyAction } from '.'
import { useTranslation } from 'react-i18next'

export interface INotificationItemProps {
    pUser: IUser | null
    pSocket: Socket | null
    pSetShowModalAuth: (isShow: boolean) => void
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pUpdateReadUserNotify: (data: INotifyUpdateRead) => void
    pLikeNews: (data: INews) => void
    pUnLikeNews: (data: INews) => void
    pSaveNews: (data: INews) => void
    pUnSaveNews: (data: INews) => void
    notify: INotify
    pLikeNewsApi: (data: INewsActions) => Promise<PayloadAction<unknown>>
}

function NotificationItem({
    notify,
    pUser,
    pSocket,
    pSetShowModalAuth,
    pUpdateReadUserNotify,
    pLikeNews,
    pUnLikeNews,
    pSaveNews,
    pUnSaveNews,
    pLikeNewsApi,
}: INotificationItemProps) {
    const { t } = useTranslation()
    const [liked, setLiked] = useState<boolean>(false)
    const [saved, setSaved] = useState<boolean>(false)
    const navigate = useNavigate()

    const linkUser = useLinkUser(notify.user as IUser)

    const isRead = useMemo(
        () => notify.readUsers?.includes((pUser?.id as number).toString()),
        [pUser, notify]
    )

    useEffect(() => {
        if (pUser?.id) {
            const isLike = pUser?.newsLikes?.some((n) => n.id === notify?.news?.id)
            const isSave = pUser?.saves?.some((n) => n.id === notify?.news?.id)

            if (isLike) {
                setLiked(true)
            } else {
                setLiked(false)
            }

            if (isSave) {
                setSaved(true)
            } else {
                setSaved(false)
            }
        }
    }, [pUser])

    const handleLikeNews = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (notify.news?.id) {
                if (liked) {
                    pUnLikeNews(notify.news)
                    await newsApi.unlikeNews(notify.news?.id)
                } else {
                    pLikeNews(notify.news)
                    await pLikeNewsApi({
                        socket: pSocket as Socket,
                        news: notify.news,
                        user: pUser as IUser,
                    })
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleSaveNews = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (notify.news?.id) {
                if (saved) {
                    pUnSaveNews(notify.news)
                    await newsApi.unsaveNews(notify.news?.id)
                } else {
                    pSaveNews(notify.news)
                    await newsApi.saveNews(notify.news?.id)
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleUpdateReadNotify = async (link: string) => {
        try {
            if (!pUser?.id) return

            navigate(link)
            if (notify.readUsers?.includes(pUser.id.toString())) return

            pUpdateReadUserNotify({
                notify,
                userId: pUser.id,
            })
            await notifyApi.readUsersNotify(notify.id)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                padding: {
                    md: 3,
                    xs: 1.5,
                },
                borderLeft: `0.5rem solid ${
                    isRead ? 'transparent' : theme.palette.primary.main
                } `,
            }}
        >
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'flex-start'}
            >
                <Stack direction={'row'} alignItems={'center'} gap={1} marginBottom={2}>
                    <Avatar
                        src={notify.user?.avatar as string}
                        alt={notify.user?.username}
                    />
                    <Box>
                        <Typography
                            sx={{
                                fontSize: {
                                    md: theme.typography.body1,
                                    xs: theme.typography.body2,
                                },
                                lineHeight: 1,
                                a: {
                                    fontWeight: 600,
                                },
                                'a, span': {
                                    fontSize: {
                                        md: theme.typography.body1,
                                        xs: '15px',
                                    },
                                },
                            }}
                        >
                            <Link to={linkUser}>{notify.user?.username}</Link>{' '}
                            <Box
                                component={'span'}
                                dangerouslySetInnerHTML={{
                                    __html: t(notify.text as string) || '',
                                }}
                                sx={{
                                    lineHeight: 1.3,
                                    color: alpha(theme.palette.secondary.main, 0.9),
                                }}
                            />
                        </Typography>
                        <Box
                            component="time"
                            sx={{
                                fontSize: theme.typography.caption,
                                color: alpha(theme.palette.secondary.main, 0.65),
                            }}
                        >
                            {moment(notify.createdAt || new Date()).fromNow()}
                        </Box>
                    </Box>
                </Stack>

                <NotifyAction
                    notify={notify}
                    sx={{
                        display: {
                            md: 'inline-block',
                            xs: 'none',
                        },
                    }}
                />
            </Stack>

            {!notify?.news && (
                <Box display={'inline-block'}>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        sx={{
                            fontSize: theme.typography.body2,
                            color: theme.palette.primary.main,
                            cursor: 'pointer',
                            svg: {
                                transition: '.2s ease-in-out',
                            },
                            '&:hover': {
                                textDecoration: 'underline',
                                svg: {
                                    transform: 'translateX(2px)',
                                },
                            },
                        }}
                        onClick={() =>
                            handleUpdateReadNotify(`/profile/${notify?.user?.username}`)
                        }
                    >
                        Go to profile {notify?.user?.username}
                        <KeyboardDoubleArrowRightIcon />
                    </Stack>
                </Box>
            )}

            {notify?.news && (
                <Box
                    paddingLeft={{
                        md: 6,
                        xs: 0,
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h5"
                        fontWeight={700}
                        sx={{
                            marginBottom: 1.5,
                            span: {
                                fontSize: theme.typography.h5,
                                fontWeight: 700,
                                cursor: 'pointer',

                                '&:hover': {
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        <Typography
                            component="span"
                            onClick={() =>
                                handleUpdateReadNotify(
                                    `/news/${notify.news?.slug as string}`
                                )
                            }
                        >
                            {notify.news?.title}
                        </Typography>
                    </Typography>
                    <HashTagList tags={notify.news?.hashTags as IHashTag[]} />
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        marginTop={3}
                        sx={{
                            button: {
                                fontSize: theme.typography.body2,
                                padding: theme.spacing(0.85, 2),
                                color: theme.palette.secondary.main,
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={
                                liked ? (
                                    <FavoriteIcon
                                        sx={{
                                            color: red[700],
                                        }}
                                    />
                                ) : (
                                    <FavoriteBorderIcon />
                                )
                            }
                            sx={{
                                backgroundColor: liked
                                    ? alpha(red[700], 0.1)
                                    : alpha(theme.palette.secondary.main, 0.075),
                                '&:hover': {
                                    backgroundColor: liked
                                        ? alpha(red[700], 0.1)
                                        : alpha(theme.palette.secondary.main, 0.1),
                                },
                            }}
                            onClick={handleLikeNews}
                        >
                            {t('button.like')}
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={
                                saved ? (
                                    <BookmarkIcon
                                        sx={{
                                            color: indigo[700],
                                        }}
                                    />
                                ) : (
                                    <BookmarkBorderIcon />
                                )
                            }
                            sx={{
                                backgroundColor: saved
                                    ? alpha(indigo[700], 0.1)
                                    : alpha(theme.palette.secondary.main, 0.075),
                                '&:hover': {
                                    backgroundColor: saved
                                        ? alpha(indigo[700], 0.1)
                                        : alpha(theme.palette.secondary.main, 0.1),
                                },
                            }}
                            onClick={handleSaveNews}
                        >
                            {t('button.save')}
                        </Button>
                    </Stack>
                </Box>
            )}
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
        pUpdateReadUserNotify: (data: INotifyUpdateRead) =>
            dispatch(readUserNotify(data)),
        pLikeNews: (data: INews) => dispatch(likeNews(data)),
        pUnLikeNews: (data: INews) => dispatch(unlikeNews(data)),
        pSaveNews: (data: INews) => dispatch(saveNews(data)),
        pUnSaveNews: (data: INews) => dispatch(unsaveNews(data)),
        pLikeNewsApi: (data: INewsActions) => dispatch(likeNewsApi(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem)
