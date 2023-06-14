import { newsApi } from '@/api'
import { INews, INewsActions, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { likeNewsApi } from '@/store/news/thunkApi'
import { likeNews, unlikeNews } from '@/store/user'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
    Box,
    BoxProps,
    Button,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    alpha,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Socket } from 'socket.io-client'

export interface IButtonNewsLikeProps extends BoxProps {
    news: INews
    pUser: IUser | null
    pSocket: Socket | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
    pLikeNews: (data: INews) => void
    pUnLikeNews: (data: INews) => void
    pLikeNewsApi: (data: INewsActions) => Promise<PayloadAction<unknown>>
}

function ButtonNewsLike({
    news,
    pUser,
    pSocket,
    pSetShowModalAuth,
    pLikeNews,
    pUnLikeNews,
    pLikeNewsApi,
    ...rest
}: IButtonNewsLikeProps) {
    const { t } = useTranslation()
    const [numLikes, setNumLikes] = useState<number>(news?.numLikes || 0)
    const [liked, setLiked] = useState<boolean>(false)

    useEffect(() => {
        if (!news) return
        if (pUser?.id) {
            const isLiked = pUser?.newsLikes?.find((n) => n.id === news.id)
            if (isLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
    }, [pUser, news])

    useEffect(() => {
        setNumLikes(news?.numLikes as number)
    }, [news])

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
                        news,
                        user: pUser as IUser,
                    })
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            {...rest}
            position={'relative'}
            width={{
                md: '100%',
                xs: 'auto',
            }}
            onClick={handleLikeNews}
        >
            <Stack
                alignItems={'center'}
                padding={theme.spacing(0, 1)}
                sx={{
                    display: {
                        md: 'flex',
                        xs: 'none',
                    },
                }}
            >
                <Tooltip title={t('button.like') as string}>
                    <IconButton
                        sx={{
                            borderRadius: '50%',

                            svg: {
                                transition: '.2s ease-in-out',
                            },
                            '&:hover': {
                                svg: {
                                    color: red[700],
                                },
                            },
                        }}
                    >
                        {liked ? (
                            <FavoriteIcon
                                sx={{
                                    color: `${red[500]} !important`,
                                }}
                            />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                </Tooltip>
                <Typography
                    component="span"
                    sx={{
                        fontSize: theme.typography.body2,
                        fontWeight: 500,
                        color: theme.palette.secondary.light,
                    }}
                >
                    {numLikes}
                </Typography>
            </Stack>

            {/* mobile */}
            <Button
                variant="contained"
                startIcon={
                    liked ? (
                        <FavoriteIcon
                            sx={{
                                color: `${red[500]} !important`,
                            }}
                        />
                    ) : (
                        <FavoriteBorderIcon />
                    )
                }
                sx={{
                    color: theme.palette.secondary.main,
                    fontSize: theme.typography.body2,
                    backgroundColor: !liked
                        ? alpha(theme.palette.secondary.main, 0.075)
                        : red[50],
                    padding: theme.spacing(1, 2),
                    display: {
                        md: 'none',
                        xs: 'flex',
                    },
                    '&:hover': {
                        backgroundColor: !liked
                            ? alpha(theme.palette.secondary.main, 0.1)
                            : red[50],
                    },
                }}
            >
                {t('button.like')}
            </Button>
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
        pLikeNews: (data: INews) => dispatch(likeNews(data)),
        pUnLikeNews: (data: INews) => dispatch(unlikeNews(data)),
        pLikeNewsApi: (data: INewsActions) => dispatch(likeNewsApi(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNewsLike)
