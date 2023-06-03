import { commentApi } from '@/api'
import { IComment, IUser } from '@/models'
import { AppDispatch } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button, ButtonProps, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export interface IButtonLikeCommentProps extends ButtonProps {
    pGetProfile: () => Promise<PayloadAction<unknown>>
    text: string
    comment: IComment
    user: IUser
}

function ButtonLikeComment({
    pGetProfile,
    comment,
    user,
    text,
    ...rest
}: IButtonLikeCommentProps) {
    const [isLike, setIsLike] = useState<boolean>(false)
    const [numLikes, setNumLikes] = useState<number>(comment.likes?.length || 0)

    useEffect(() => {
        const isLike = comment.likes?.some((u) => u.id === user?.id)
        if (isLike) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }

        setNumLikes(comment.likes?.length || 0)
    }, [user, comment])

    const handleLikeComment = async () => {
        try {
            if (isLike) {
                setIsLike(false)
                setNumLikes(numLikes - 1)
                await commentApi.unlikeComment(comment.id)
            } else {
                setIsLike(true)
                setNumLikes(numLikes + 1)
                await commentApi.likeComment(comment.id)
            }

            await pGetProfile()
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
    }
}

export default connect(null, mapDispatchProps)(ButtonLikeComment)
