import { commentApi } from '@/api'
import { IComment, IUser } from '@/models'
import { AppDispatch } from '@/store'
import { IActionComment } from '@/store/comment/reducers'
import { getProfile } from '@/store/user/thunkApi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Button, ButtonProps } from '@mui/material'
import { red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export interface IButtonLikeCommentProps extends ButtonProps {
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pLikeComment: (data: IActionComment) => void
    pUnLikeComment: (data: IActionComment) => void
    comment: IComment
    user: IUser
}

function ButtonLikeComment({
    pGetProfile,
    comment,
    user,
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
                // pUnLikeComment({ comment, user })
                await commentApi.unlikeComment(comment.id)
            } else {
                setIsLike(true)
                setNumLikes(numLikes + 1)
                // pLikeComment({ comment, user })
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
