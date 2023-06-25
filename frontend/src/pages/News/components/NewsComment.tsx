import { commentApi, notifyApi } from '@/api'
import { CommentInput, CommentList } from '@/components'
import { ProgressLoading, SkeletonCommentList } from '@/components/Common'
import { NotifyType, Order } from '@/enums'
import { IComment, ICommentData, IFilters, INews, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { getAllCommentsById, getAllCommentsByIdLoadMore } from '@/store/comment/thunkApi'
import { increaseNumComment } from '@/store/news'
import { analystTextToUsernames, convertMentionToHtml, theme } from '@/utils'
import { Box, BoxProps, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export interface INewsCommentProps extends BoxProps {
    news: INews
    isLoading?: boolean
    pUser: IUser | null
    pComments: IComment[]
    pTotal: number
    pGetAllComments: (params: IFilters) => Promise<PayloadAction<unknown>>
    pGetAllCommentsLoadMore: (params: IFilters) => Promise<PayloadAction<unknown>>
    pIncreaseNumComments: () => void
    pLoadingComment: boolean
}

function NewsComment({
    news,
    pUser,
    pComments,
    pTotal,
    pGetAllCommentsLoadMore,
    pIncreaseNumComments,
    pLoadingComment,
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
    const [loadMore, setLoadMore] = useState<boolean>(false)
    const [loadingCreateComment, setLoadingCreateComment] = useState<boolean>(false)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (commentRef.current && location.hash === '#comments') {
            commentRef.current.scrollIntoView({ behavior: 'smooth' })
            setTimeout(() => {
                if (commentInputRef.current) {
                    commentInputRef.current.focus()
                }
            }, 0)
        }
    }, [location, navigate])

    useEffect(() => {
        if (loadMore) {
            ;(async () => {
                try {
                    const newFilters = { ...filters, newsId: news.id }
                    await pGetAllCommentsLoadMore(newFilters)
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
            setLoadingCreateComment(true)
            const newComment: ICommentData = {
                userId: pUser?.id as number,
                newsId: news.id,
                comment: value,
            }

            await commentApi.createComment(newComment)
            await notifyApi.createCommentNotify({
                userId: pUser?.id as number,
                newsId: news.id,
                user: pUser as IUser,
                news: news as INews,
                text: 'has been commented your news',
                recipients: [news?.user as IUser],
                readUsers: [],
                type: NotifyType.COMMENT,
            })
            setLoadingCreateComment(false)
            pIncreaseNumComments()

            // notify create new comment
            const usernames = analystTextToUsernames(value) as string[]
            if (usernames.length) {
                const data = {
                    userId: pUser?.id as number,
                    newsId: news.id,
                    user: pUser as IUser,
                    news,
                    text: 'mention you',
                }

                await notifyApi.createNotifiesForComment({
                    ...data,
                    users: usernames,
                    commentText: convertMentionToHtml(value),
                })
            }
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
        setLoadingCreateComment(false)
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
                    {t('news.comment')} ({news.numComments})
                </Typography>
            </Box>

            <Box>
                {pUser && (
                    <CommentInput
                        initValue={''}
                        commentInputRef={commentInputRef}
                        onCommentChange={handleCommentSubmit}
                        t={t}
                        loading={loadingCreateComment}
                        sx={{
                            marginBottom: 6,
                        }}
                    />
                )}
                {pLoadingComment && <SkeletonCommentList quantities={5} />}
                {!pLoadingComment && <CommentList comments={pComments} t={t} />}

                {loadMore && <ProgressLoading />}
                {hasLoadMore && !!commentLength && (
                    <Stack alignItems={'center'}>
                        <Button
                            variant="contained"
                            onClick={handleLoadMore}
                            sx={{
                                padding: theme.spacing(1, 2),
                                fontWeight: 500,
                            }}
                        >
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
        pLoadingComment: state.common.loadingComment,
    }
}

const mapDispatchProps = (dispatch: AppDispatch) => {
    return {
        pGetAllComments: (params: IFilters) => dispatch(getAllCommentsById(params)),
        pGetAllCommentsLoadMore: (params: IFilters) =>
            dispatch(getAllCommentsByIdLoadMore(params)),
        pIncreaseNumComments: () => dispatch(increaseNumComment()),
    }
}

export default connect(mapStateToProps, mapDispatchProps)(NewsComment)
