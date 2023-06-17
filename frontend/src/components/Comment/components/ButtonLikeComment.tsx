import { commentApi } from '@/api'
import { IComment, ICommentLikeNotify, INews, IUser } from '@/models'
import { AppDispatch } from '@/store'
import { likeCommentNotify } from '@/store/comment/thunkApi'
import { setShowModalAuth } from '@/store/common'
import { addLikeComment, removeLikeComment } from '@/store/user'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button, ButtonProps, Typography, alpha } from '@mui/material'
import { red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export interface IButtonLikeCommentProps extends ButtonProps {
    text: string
    comment: IComment
    user: IUser
    news: INews
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pAddCommentLike: (data: IComment) => void
    pRemoveCommentLike: (data: IComment) => void
    pLikeComment: (data: ICommentLikeNotify) => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
}

function ButtonLikeComment({
    comment,
    user,
    news,
    text,
    pAddCommentLike,
    pRemoveCommentLike,
    pLikeComment,
    pSetShowModalAuth,
    ...rest
}: IButtonLikeCommentProps) {
    const [isLike, setIsLike] = useState<boolean>(false)
    const [numLikes, setNumLikes] = useState<number>(comment.likes?.length || 0)

    useEffect(() => {
        const isLike = user?.commentLikes?.some((u) => u.id === comment.id)
        if (isLike) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }

        setNumLikes(comment.likes?.length || 0)
    }, [comment])

    const handleLikeComment = async () => {
        try {
            if (!user?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (isLike) {
                setIsLike(false)
                setNumLikes(numLikes - 1)
                pRemoveCommentLike(comment)
                await commentApi.unlikeComment(comment.id)
            } else {
                setIsLike(true)
                setNumLikes(numLikes + 1)
                pAddCommentLike(comment)

                const data = {
                    comment,
                    user,
                    news,
                }
                await pLikeComment(data)
            }
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Button
            {...rest}
            variant={'contained'}
            fullWidth
            startIcon={
                isLike ? (
                    <FavoriteIcon
                        sx={{
                            color: red[500],
                        }}
                    />
                ) : (
                    <FavoriteBorderIcon />
                )
            }
            sx={{
                backgroundColor: isLike
                    ? `${red[50]} !important`
                    : alpha(theme.palette.secondary.dark, 0.05),
                span: {
                    fontSize: theme.typography.body2,
                },
            }}
            onClick={handleLikeComment}
        >
            <Typography component={'span'} marginRight={numLikes ? 0.5 : 0}>
                {numLikes === 0 ? '' : numLikes}
            </Typography>
            <Typography
                component="span"
                sx={{
                    display: {
                        md: 'inline-block',
                        xs: 'none',
                    },
                }}
            >
                {' '}
                {text}
            </Typography>
        </Button>
    )
}

const mapDispatchProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
        pAddCommentLike: (data: IComment) => dispatch(addLikeComment(data)),
        pRemoveCommentLike: (data: IComment) => dispatch(removeLikeComment(data)),
        pLikeComment: (data: ICommentLikeNotify) => dispatch(likeCommentNotify(data)),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(null, mapDispatchProps)(ButtonLikeComment)
