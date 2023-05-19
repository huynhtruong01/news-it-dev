import { Button, ButtonProps } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useState, useEffect } from 'react'
import { IComment, IUser } from '@/models'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { red } from '@mui/material/colors'
import { connect } from 'react-redux'
import { AppDispatch } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { commentApi } from '@/api'
import { enqueueSnackbar } from 'notistack'

export interface IButtonLikeCommentProps extends ButtonProps {
    comment: IComment
    user: IUser
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function ButtonLikeComment({
    comment,
    user,
    pGetProfile,
    ...rest
}: IButtonLikeCommentProps) {
    const [isLike, setIsLike] = useState<boolean>(false)
    const [numLikes, setNumLikes] = useState<number>(comment.numLikes || 0)

    useEffect(() => {
        const isLike = comment.likes?.find((u) => u.id === user?.id)
        if (isLike) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
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
            onClick={handleLikeComment}
        >
            {numLikes} likes
        </Button>
    )
}

const mapDispatchProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
    }
}

export default connect(null, mapDispatchProps)(ButtonLikeComment)
