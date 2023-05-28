import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { INews, IUser } from '@/models'
import { PayloadAction } from '@reduxjs/toolkit'
import { newsApi } from '@/api'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { red } from '@mui/material/colors'
import { setShowModalAuth } from '@/store/common'

export interface IButtonNewsLikeProps extends BoxProps {
    news: INews
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
}

function ButtonNewsLike({
    news,
    pUser,
    pGetProfile,
    pSetShowModalAuth,
    ...rest
}: IButtonNewsLikeProps) {
    const [numLikes, setNumLikes] = useState<number>(news?.numLikes || 0)
    const [liked, setLiked] = useState<boolean>(false)

    useEffect(() => {
        if (!news) return
        setNumLikes(news.numLikes as number)

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
                    await newsApi.unlikeNews(news.id)
                } else {
                    await newsApi.likeNews(news.id)
                }

                await pGetProfile()
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
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNewsLike)
