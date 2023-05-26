import { newsApi } from '@/api'
import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { IHashTag, INews, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { formatDate, theme } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Avatar, Box, Button, Paper, Stack, Typography, alpha } from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RiChat3Line } from 'react-icons/ri'

export interface INewsItemProps {
    pUser: IUser | null
    pSetShowModalAuth: (isShow: boolean) => void
    pGetProfile: () => Promise<PayloadAction<unknown>>
    news: INews
}

const useStyles = makeStyles({
    button: {
        backgroundColor: alpha(theme.palette.secondary.main, 0.075),
        '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        },
    },
})

function NewsItem({ pUser, pSetShowModalAuth, pGetProfile, news }: INewsItemProps) {
    const styles = useStyles()
    const [liked, setLiked] = useState<boolean>(false)
    const [saved, setSaved] = useState<boolean>(false)
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

    const handleNavigateComment = () => {
        navigate(`/news/${news.slug}#comments`)
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
                        {formatDate(news?.createdAt || new Date(), "MMM DD 'YY")}
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
                            {news.numLikes} Like
                        </Button>
                        <Button
                            className={styles.button}
                            startIcon={<RiChat3Line />}
                            variant="contained"
                            onClick={handleNavigateComment}
                        >
                            Comment
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
                            {news.readTimes} min read
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
                            Save
                        </Button>
                    </Stack>
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
