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

export interface IButtonNewsIconProps extends BoxProps {
    news: INews
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
}

function ButtonNewsIcon({
    news,
    pUser,
    pGetProfile,
    pSetShowModalAuth,
    ...rest
}: IButtonNewsIconProps) {
    const [numLikes, setNumLikes] = useState<number>(news.numLikes || 0)
    const [liked, setLiked] = useState<boolean>(false)

    useEffect(() => {
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
                    setLiked(false)
                    setNumLikes(numLikes <= 0 ? 0 : numLikes - 1)
                    await newsApi.unlikeNews(news.id)
                } else {
                    setLiked(true)
                    setNumLikes(numLikes + 1)
                    await newsApi.likeNews(news.id)
                }

                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            {...rest}
            position={'relative'}
            width={'100%'}
            onClick={handleLikeNews}
            sx={{
                cursor: 'pointer',
            }}
        >
            <Stack alignItems={'center'} padding={theme.spacing(0, 1)}>
                <IconButton
                    sx={{
                        borderRadius: '50%',
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
                    fontSize={'14px'}
                    fontWeight={500}
                    color={theme.palette.secondary.light}
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNewsIcon)
