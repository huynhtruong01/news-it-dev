import { newsApi } from '@/api'
import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { IHashTag, INotify, INotifyUpdateReadParams, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Avatar, Box, Button, Paper, Stack, Typography, alpha } from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { enqueueSnackbar } from 'notistack'
import { readUsersNotify } from '@/store/notify/thunkApi'

export interface INotificationItemProps {
    pUser: IUser | null
    pSetShowModalAuth: (isShow: boolean) => void
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pReadUsersNotify: (data: INotifyUpdateReadParams) => Promise<PayloadAction<unknown>>
    notify: INotify
}

function NotificationItem({
    pUser,
    pSetShowModalAuth,
    pGetProfile,
    pReadUsersNotify,
    notify,
}: INotificationItemProps) {
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
                    setLiked(false)
                    await newsApi.unlikeNews(notify.news?.id)
                } else {
                    setLiked(true)
                    await newsApi.likeNews(notify.news?.id)
                }

                await pGetProfile()
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
                    setSaved(false)
                    await newsApi.unsaveNews(notify.news?.id)
                } else {
                    setSaved(true)
                    await newsApi.saveNews(notify.news?.id)
                }

                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleUpdateReadNotify = async (link: string) => {
        try {
            if (!pUser?.id) return

            navigate(link)
            if (notify.readUsers.includes(pUser.id.toString())) return

            await pReadUsersNotify({
                notifyId: notify.id,
                userId: pUser.id,
            })
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
                padding: 3,
                borderLeft: `0.5rem solid ${
                    isRead ? 'transparent' : theme.palette.primary.main
                } `,
            }}
        >
            <Stack direction={'row'} alignItems={'center'} gap={1} marginBottom={2}>
                <Avatar src={notify.user?.avatar} alt={notify.user?.username} />
                <Box>
                    <Typography
                        variant="body1"
                        sx={{
                            display: 'flex',
                            gap: 0.5,
                            a: {
                                fontWeight: 600,
                            },
                        }}
                    >
                        <Link to={linkUser}>{notify.user?.username}</Link>{' '}
                        <Box dangerouslySetInnerHTML={{ __html: notify.text || '' }} />
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

            {notify?.news && (
                <Box paddingLeft={6}>
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
                            Like
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
                            Save
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
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
        pReadUsersNotify: (data: INotifyUpdateReadParams) =>
            dispatch(readUsersNotify(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem)
