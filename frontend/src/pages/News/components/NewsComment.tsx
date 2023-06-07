import { commentApi } from '@/api'
import { CommentInput, CommentList } from '@/components'
import { ProgressLoading } from '@/components/Common'
import { Order } from '@/enums'
import { IComment, ICommentData, IFilters, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { getAllCommentsById } from '@/store/comment/thunkApi'
import { Box, BoxProps, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

export interface INewsCommentProps extends BoxProps {
    newsId: number
    pUser: IUser | null
    pComments: IComment[]
    pTotal: number
    pGetAllComments: (params: IFilters) => Promise<PayloadAction<unknown>>
}

function NewsComment({
    newsId,
    pUser,
    pComments,
    pGetAllComments,
    pTotal,
    ...rest
}: INewsCommentProps) {
    const { t } = useTranslation()
    const isSmallScreen = useMediaQuery('(min-width:320px)')
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.DESC,
    })
    const commentInputRef = useRef<HTMLInputElement | null>(null)
    const commentRef = useRef<HTMLDivElement | null>(null)
    const [loadingComment, setLoadingComment] = useState<boolean>(true)
    const [loadMore, setLoadMore] = useState<boolean>(false)

    const location = useLocation()

    useEffect(() => {
        if (commentRef.current && location.hash === '#comments') {
            commentRef.current.scrollIntoView({ behavior: 'smooth' })

            if (commentInputRef.current) {
                commentInputRef.current.focus()
            }
        }
    }, [location])

    useEffect(() => {
        // get all comments by news id
        ;(async () => {
            setLoadingComment(true)
            try {
                const newFilters = { ...filters, newsId }
                await pGetAllComments(newFilters)
            } catch (error) {
                enqueueSnackbar((error as Error).message, {
                    variant: 'error',
                })
            }
            setLoadingComment(false)
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

            await commentApi.createComment(newComment)
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
                    return c.childrenComments?.length + quantities + 1
                return quantities + 1
            }, 0)
        }
        return 0
    }, [pComments])

    return (
        <Box {...rest} ref={commentRef} id="comments">
            <Box component="header" marginBottom={3}>
                <Typography
                    component="h2"
                    variant={isSmallScreen ? 'h6' : 'h5'}
                    fontWeight={700}
                >
                    {t('news.comment')} ({commentLength})
                </Typography>
            </Box>

            <Box>
                {pUser && (
                    <CommentInput
                        initValue={''}
                        commentInputRef={commentInputRef}
                        onCommentChange={handleCommentSubmit}
                        t={t}
                        sx={{
                            marginBottom: 6,
                        }}
                    />
                )}
                {loadingComment && <ProgressLoading />}
                {!loadingComment && <CommentList comments={pComments} t={t} />}

                {loadMore && <ProgressLoading />}
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
    }
}

export default connect(mapStateToProps, mapDispatchProps)(NewsComment)
