import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { INews, INewsActions, IUser } from '@/models'
import { PayloadAction } from '@reduxjs/toolkit'
import { newsApi } from '@/api'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { red } from '@mui/material/colors'
import { setShowModalAuth } from '@/store/common'
import { likeNews, unlikeNews } from '@/store/user'
import { likeNewsApi } from '@/store/news/thunkApi'
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
        <Box {...rest} position={'relative'} width={'100%'} onClick={handleLikeNews}>
            <Stack alignItems={'center'} padding={theme.spacing(0, 1)}>
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
