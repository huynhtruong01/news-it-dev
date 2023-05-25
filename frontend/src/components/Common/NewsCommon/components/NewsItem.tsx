import { newsApi } from '@/api'
import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { IHashTag, INews, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Avatar, Box, Button, Paper, Stack, Typography, alpha } from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface INewsItemProps {
    pUser: IUser | null
    pSetShowModalAuth: (isShow: boolean) => void
    pGetProfile: () => Promise<PayloadAction<unknown>>
    news: INews
}

function NewsItem({ pUser, pSetShowModalAuth, pGetProfile, news }: INewsItemProps) {
    const [liked, setLiked] = useState<boolean>(false)
    const [saved, setSaved] = useState<boolean>(false)

    const linkUser = useLinkUser(news?.user as IUser)

    useEffect(() => {
        if (pUser?.id) {
            const isLike = pUser?.newsLikes?.some((n) => n.id === news.id)
            const isSave = pUser?.saves?.some((n) => n.id === news.id)

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

            if (news.id) {
                if (liked) {
                    setLiked(false)
                    await newsApi.unlikeNews(news.id)
                } else {
                    setLiked(true)
                    await newsApi.likeNews(news.id)
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

            if (news.id) {
                if (saved) {
                    setSaved(false)
                    await newsApi.unsaveNews(news.id)
                } else {
                    setSaved(true)
                    await newsApi.saveNews(news.id)
                }

                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                padding: 3,
            }}
        >
            <Stack direction={'row'} alignItems={'center'} gap={1} marginBottom={2}>
                <Link to={linkUser}>
                    <Avatar src={news?.user?.avatar} alt={news?.user?.username} />
                </Link>
                <Box>
                    <Typography
                        variant="body1"
                        sx={{
                            a: {
                                fontWeight: 600,
                            },
                        }}
                    >
                        <Link to={linkUser}>{news?.user?.username}</Link>
                    </Typography>
                    <Box
                        component="time"
                        sx={{
                            fontSize: theme.typography.caption,
                            color: alpha(theme.palette.secondary.main, 0.65),
                        }}
                    >
                        {moment(news?.createdAt || new Date()).fromNow()}
                    </Box>
                </Box>
            </Stack>

            <Box paddingLeft={6}>
                <Typography
                    component="h2"
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        marginBottom: 1.5,
                        a: {
                            '&:hover': {
                                color: theme.palette.primary.main,
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    <Link to={`/news/${news?.slug}`}>{news?.title}</Link>
                </Typography>
                <HashTagList tags={news?.hashTags as IHashTag[]} />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem)
