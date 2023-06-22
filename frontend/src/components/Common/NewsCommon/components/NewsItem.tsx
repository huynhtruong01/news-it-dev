import { newsApi } from '@/api'
import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { IHashTag, INews, INewsActions, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { formatDate, theme, timeSince } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RiChat3Line } from 'react-icons/ri'
import { likeNews, saveNews, unlikeNews, unsaveNews } from '@/store/user'
import { likeNewsApi } from '@/store/news/thunkApi'
import { Socket } from 'socket.io-client'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGES } from '@/consts'

export interface INewsItemProps {
    news: INews
    user?: IUser
    pLanguages: string
    pUser: IUser | null
    pSocket: Socket | null
    pSetShowModalAuth: (isShow: boolean) => void
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pLikeNews: (data: INews) => void
    pUnLikeNews: (data: INews) => void
    pSaveNews: (data: INews) => void
    pUnSaveNews: (data: INews) => void
    pLikeNewsApi: (data: INewsActions) => Promise<PayloadAction<unknown>>
}

const useStyles = makeStyles({
    button: {
        backgroundColor: `${alpha(theme.palette.secondary.main, 0.075)} !important`,
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.secondary.main, 0.1)} !important`,
        },
    },
})

function NewsItem({
    news,
    user,
    pUser,
    pSocket,
    pSetShowModalAuth,
    pLikeNews,
    pUnLikeNews,
    pSaveNews,
    pUnSaveNews,
    pLikeNewsApi,
    pLanguages,
}: INewsItemProps) {
    const { t } = useTranslation()
    const styles = useStyles()
    const [liked, setLiked] = useState<boolean>(false)
    const [saved, setSaved] = useState<boolean>(false)
    const [numLikes, setNumLikes] = useState<number>(news.numLikes || 0)
    const navigate = useNavigate()

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
                    setNumLikes(numLikes - 1)
                    pUnLikeNews(news)
                    await newsApi.unlikeNews(news.id)
                } else {
                    setNumLikes(numLikes + 1)
                    pLikeNews(news)
                    await pLikeNewsApi({
                        socket: pSocket as Socket,
                        news: { ...news, user: news.user ? news.user : user },
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

            if (news.id) {
                if (saved) {
                    pUnSaveNews(news)
                    await newsApi.unsaveNews(news.id)
                } else {
                    pSaveNews(news)
                    await newsApi.saveNews(news.id)
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleNavigateComment = () => {
        navigate(`/news/${news.slug}#comments`)
    }

    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                padding: {
                    md: 3,
                    xs: 2,
                },
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                gap={1}
                marginBottom={{
                    md: 2,
                    xs: 1.2,
                }}
            >
                <Link to={linkUser}>
                    <Avatar
                        src={(news?.user?.avatar as string) || (user?.avatar as string)}
                        alt={news?.user?.username || user?.username}
                    />
                </Link>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            lineHeight: 1,
                            a: {
                                fontWeight: 600,
                            },
                        }}
                    >
                        <Link to={linkUser}>
                            {news?.user?.username || user?.username}
                        </Link>
                    </Typography>
                    <Box
                        component="time"
                        sx={{
                            fontSize: theme.typography.caption,
                            color: alpha(theme.palette.secondary.main, 0.65),
                        }}
                    >
                        {pLanguages === DEFAULT_LANGUAGES
                            ? timeSince(news?.createdAt || new Date())
                            : formatDate(news?.createdAt || new Date(), "MMM DD 'YY")}
                    </Box>
                </Box>
            </Stack>

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
                {news.hashTags && news.hashTags.length > 0 && (
                    <HashTagList
                        tags={news?.hashTags as IHashTag[]}
                        sx={{
                            marginTop: 1.5,
                        }}
                    />
                )}

                {/* tablet, laptop */}
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    marginTop={3}
                    sx={{
                        display: {
                            md: 'flex',
                            xs: 'none',
                        },
                        button: {
                            fontSize: theme.typography.body2,
                            padding: theme.spacing(0.85, 2),
                            color: theme.palette.secondary.main,
                        },
                    }}
                >
                    <Stack direction={'row'} gap={1}>
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
                            {numLikes} {t('button.likes')}
                        </Button>
                        <Button
                            className={styles.button}
                            startIcon={<RiChat3Line />}
                            variant="contained"
                            onClick={handleNavigateComment}
                        >
                            {t('button.comment')}
                        </Button>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                        <Typography
                            component="small"
                            variant="caption"
                            sx={{
                                color: alpha(theme.palette.secondary.main, 0.8),
                            }}
                        >
                            {news.readTimes} {t('common.min_read')}
                        </Typography>
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
                </Stack>

                {/* mobile */}
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    sx={{
                        display: {
                            md: 'none',
                            xs: 'flex',
                        },
                        svg: {
                            fontSize: theme.typography.h5,
                        },
                    }}
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        gap={1}
                    >
                        <IconButton
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
                            {liked ? (
                                <FavoriteIcon
                                    sx={{
                                        color: `${red[700]} !important`,
                                    }}
                                />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                        <IconButton
                            className={styles.button}
                            onClick={handleNavigateComment}
                        >
                            <RiChat3Line />
                        </IconButton>
                    </Stack>
                    <IconButton
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
                        {saved ? (
                            <BookmarkIcon
                                sx={{
                                    color: `${indigo[700]} !important`,
                                }}
                            />
                        ) : (
                            <BookmarkBorderIcon />
                        )}
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pSocket: state.socket.socket,
        pLanguages: state.common.languages,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
        pLikeNews: (data: INews) => dispatch(likeNews(data)),
        pUnLikeNews: (data: INews) => dispatch(unlikeNews(data)),
        pSaveNews: (data: INews) => dispatch(saveNews(data)),
        pUnSaveNews: (data: INews) => dispatch(unsaveNews(data)),
        pLikeNewsApi: (data: INewsActions) => dispatch(likeNewsApi(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem)
