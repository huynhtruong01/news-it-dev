import { CommentInput, CommentList } from '@/components'
import { comments } from '@/data'
import { IComment, ICommentData, IFilters, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { createComment, getAllCommentsById } from '@/store/comment/thunkApi'
import { theme } from '@/utils'
import { Box, BoxProps, Typography } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useRef } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Order } from '@/enums'

export interface INewsCommentProps extends BoxProps {
    comments: IComment[]
    newsId: number
    pUser: IUser | null
    pComments: IComment[]
    pGetAllComments: (params: IFilters) => Promise<PayloadAction<unknown>>
    pCreateComment: (data: ICommentData) => Promise<PayloadAction<unknown>>
}

function NewsComment({
    comments,
    newsId,
    pUser,
    pComments,
    pGetAllComments,
    pCreateComment,
    ...rest
}: INewsCommentProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.DESC,
    })
    const commentInputRef = useRef<HTMLInputElement | null>(null)
    const commentRef = useRef<HTMLDivElement | null>(null)

    const location = useLocation()

    useEffect(() => {
        if (commentRef.current && location.hash === '#comments') {
            commentRef.current.scrollIntoView({ behavior: 'smooth' })
            if (commentInputRef.current) {
                commentInputRef.current.focus()
            }
        }

        // get all comments by news id
        // ;(async () => {
        //     try {
        //         const newFilters = { ...filters, newsId }
        //         await pGetAllComments(newFilters)
        //     } catch (error) {
        //         enqueueSnackbar((error as Error).message, {
        //             variant: 'error',
        //         })
        //     }
        // })()
    }, [])

    const handleCommentSubmit = async (value: string) => {
        try {
            const newComment: ICommentData = {
                userId: pUser?.id as number,
                newsId,
                comment: value,
            }
            await pCreateComment(newComment)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    const commentLength = useMemo(() => {
        return comments.length || 0
    }, [comments])

    return (
        <Box {...rest} ref={commentRef} id="comments" padding={theme.spacing(4, 8)}>
            <Box component="header" marginBottom={3}>
                <Typography component="h2" variant="h5" fontWeight={700}>
                    Comments ({commentLength})
                </Typography>
            </Box>

            <Box>
                <CommentInput
                    onCommentChange={handleCommentSubmit}
                    sx={{
                        marginBottom: 6,
                    }}
                />
                <CommentList comments={comments} />
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pComments: state.comment.comments,
    }
}

const mapDispatchProps = (dispatch: AppDispatch) => {
    return {
        pGetAllComments: (params: IFilters) => dispatch(getAllCommentsById(params)),
        pCreateComment: (data: ICommentData) => dispatch(createComment(data)),
    }
}

export default connect(mapStateToProps, mapDispatchProps)(NewsComment)
