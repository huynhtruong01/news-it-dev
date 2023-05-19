import { CommentInput, CommentList } from '@/components'
import { Order } from '@/enums'
import { IComment, ICommentData, IFilters, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { createComment, getAllCommentsById } from '@/store/comment/thunkApi'
import { theme } from '@/utils'
import { Box, BoxProps, Typography, Button, Stack } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

export interface INewsCommentProps extends BoxProps {
    newsId: number
    pUser: IUser | null
    pComments: IComment[]
    pTotal: number
    pGetAllComments: (params: IFilters) => Promise<PayloadAction<unknown>>
    pCreateComment: (data: ICommentData) => Promise<PayloadAction<unknown>>
}

function NewsComment({
    newsId,
    pUser,
    pComments,
    pGetAllComments,
    pCreateComment,
    pTotal,
    ...rest
}: INewsCommentProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.DESC,
    })
    const commentInputRef = useRef<HTMLInputElement | null>(null)
    const commentRef = useRef<HTMLDivElement | null>(null)
    const [loadMore, setLoadMore] = useState<boolean>(false)

    const location = useLocation()

    useEffect(() => {
        if (commentRef.current && location.hash === '#comments') {
            commentRef.current.scrollIntoView({ behavior: 'smooth' })
            if (commentInputRef.current) {
                commentInputRef.current.focus()
            }
        }

        // get all comments by news id
        ;(async () => {
            try {
                const newFilters = { ...filters, newsId }
                await pGetAllComments(newFilters)
            } catch (error) {
                enqueueSnackbar((error as Error).message, {
                    variant: 'error',
                })
            }
        })()
    }, [])

    useEffect(() => {
        if (loadMore) {
            ;(async () => {
                try {
                    const newFilters = { ...filters, newsId }
                    await pGetAllComments(newFilters)
                } catch (error) {
                    enqueueSnackbar((error as Error).message, {
                        variant: 'error',
                    })
                }
                setLoadMore(false)
            })()
        }
    }, [filters])

    const hasLoadMore = useMemo(
        () => filters.page < Math.ceil(pTotal / filters.limit),
        [filters]
    )

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

    const handleLoadMore = () => {
        setFilters((prev) => ({ ...prev, page: filters.page + 1 }))
        setLoadMore(true)
    }

    const commentLength = useMemo(() => {
        if (pComments.length) {
            return pComments.reduce((quantities, c) => {
                if (c.childrenComments?.length)
                    return c.childrenComments?.length + quantities
                return 1 + quantities
            }, 0)
        }
        return 0
    }, [pComments])

    return (
        <Box {...rest} ref={commentRef} id="comments" padding={theme.spacing(4, 8)}>
            <Box component="header" marginBottom={3}>
                <Typography component="h2" variant="h5" fontWeight={700}>
                    Comments ({commentLength})
                </Typography>
            </Box>

            <Box>
                <CommentInput
                    initValue={''}
                    onCommentChange={handleCommentSubmit}
                    sx={{
                        marginBottom: 6,
                    }}
                />
                <CommentList comments={pComments} />

                {loadMore && (
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: theme.palette.primary.main,
                        }}
                    >
                        Loading more comment...
                    </Typography>
                )}
                {hasLoadMore && commentLength && (
                    <Stack alignItems={'center'}>
                        <Button variant="contained" onClick={handleLoadMore}>
                            Load more
                        </Button>
                    </Stack>
                )}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pComments: state.comment.comments,
        pTotal: state.comment.total,
    }
}

const mapDispatchProps = (dispatch: AppDispatch) => {
    return {
        pGetAllComments: (params: IFilters) => dispatch(getAllCommentsById(params)),
        pCreateComment: (data: ICommentData) => dispatch(createComment(data)),
    }
}

export default connect(mapStateToProps, mapDispatchProps)(NewsComment)
