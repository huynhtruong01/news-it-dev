import { commentApi, notifyApi } from '@/api'
import { ButtonLikeComment, CommentAction } from '@/components/Comment/components'
import { ButtonIconForm } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { IComment, ICommentData, INews, INotifyData, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { convertMentionToHtml, formatDate, theme } from '@/utils'
import { Avatar, Box, Paper, Stack, Typography, alpha } from '@mui/material'
import { TFunction } from 'i18next'
import { enqueueSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { RiChat1Line } from 'react-icons/ri'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CommentInput, CommentList } from '.'
import { increaseNumComment } from '@/store/news'
import { setShowModalAuth } from '@/store/common'
import { NotifyType } from '@/enums'
import { SkeletonCommentItem } from '@/components/Common/Skeleton/SkeletonCommentList/components'

export interface ICommentItemProps {
    comment: IComment
    t: TFunction<'translation', undefined, 'translation'>
    pUser: IUser | null
    pIncreaseNumComments: () => void
    pSetShowModalAuth: (isShow: boolean) => void
}

function CommentItem({
    pUser,
    comment,
    t,
    pIncreaseNumComments,
    pSetShowModalAuth,
}: ICommentItemProps) {
    const [isReply, setIsReply] = useState<boolean>(false)
    const [initValue, setInitValue] = useState<string>('')
    const [edit, setEdit] = useState<IComment | null>(null)
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [loadingReply, setLoadingReply] = useState<boolean>(false)
    const [replyUser, setReplyUser] = useState<IUser | null>(null)

    const linkUser = useLinkUser(comment.user as IUser)

    const {
        comment: content,
        user,
        childrenComments,
        newsId,
        news,
        replyUserId,
        replyUser: replyUserData,
        createdAt,
    } = comment

    const newChildrenComments = useMemo(() => {
        return childrenComments?.length ? childrenComments : []
    }, [comment])

    const handleShowInputReply = (user: IUser) => {
        if (!pUser?.id) {
            pSetShowModalAuth(true)
            return
        }

        setReplyUser(user)
        setIsReply(true)
    }

    const handleReplyComment = async (value: string) => {
        try {
            setIsReply(false)
            setLoadingReply(true)

            const newComment: ICommentData = {
                userId: pUser?.id as number,
                newsId,
                replyUserId: replyUser?.id,
                comment: value,
                parentCommentId: comment.parentCommentId
                    ? comment.parentCommentId
                    : comment.id,
            }

            pIncreaseNumComments()

            await commentApi.replyComment(newComment)
            setLoadingReply(false)

            const notify: INotifyData = {
                userId: pUser?.id as number,
                newsId: newsId,
                user: pUser as IUser,
                news: news as INews,
                recipients: [replyUser as IUser],
                commentText: convertMentionToHtml(value),
                readUsers: [],
                text: 'reply to your comment',
                type: NotifyType.REPLY,
            }
            await notifyApi.replyCommentNotify(notify)

            setReplyUser(null)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }

        setLoadingReply(false)
    }

    const handleUpdateComment = async (value: string) => {
        try {
            const newValues: ICommentData = {
                ...edit,
                comment: value,
            } as ICommentData

            setLoadingUpdate(true)

            if (newValues?.parentCommentId) {
                await commentApi.updateCommentReply(newValues)
            } else {
                await commentApi.updateComment(newValues)
            }

            setEdit(null)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
        setLoadingUpdate(false)
    }

    const handleNavReply = (userId: number, username: string): string => {
        if (userId === pUser?.id) return `/profile`
        return `/profile/${username}`
    }

    return (
        <Box>
            <Stack
                direction={'row'}
                gap={{
                    md: 2,
                    xs: 1,
                }}
            >
                {!loadingUpdate && (
                    <Box>
                        <Link to={linkUser}>
                            <Avatar
                                src={user?.avatar as string}
                                alt={user?.username}
                                sx={{
                                    width: {
                                        md: 32,
                                        xs: 24,
                                    },
                                    height: {
                                        md: 32,
                                        xs: 24,
                                    },
                                }}
                            />
                        </Link>
                    </Box>
                )}

                <Box flex={1}>
                    {!edit && !loadingUpdate && (
                        <Paper
                            elevation={1}
                            sx={{
                                padding: 1,
                            }}
                        >
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    gap={0.5}
                                    flexWrap={'wrap'}
                                >
                                    <Typography
                                        component="span"
                                        fontWeight={500}
                                        fontSize={{
                                            lg: '1rem',
                                            xs: '14px',
                                        }}
                                    >
                                        <Link to={linkUser}>{user?.username} </Link>
                                    </Typography>

                                    {replyUserId && replyUserData?.id && (
                                        <>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    color: alpha(
                                                        theme.palette.secondary.dark,
                                                        0.8
                                                    ),
                                                    fontSize: theme.typography.body2,

                                                    a: {
                                                        fontWeight: 700,
                                                        color: theme.palette.primary.main,
                                                    },
                                                }}
                                            >
                                                {' '}
                                                {t('message.reply_to')}{' '}
                                                <Link
                                                    to={`${handleNavReply(
                                                        replyUserData.id,
                                                        replyUserData.username
                                                    )}`}
                                                >
                                                    {replyUserData.username ===
                                                    pUser?.username
                                                        ? t('you')
                                                        : replyUserData.username}
                                                </Link>
                                            </Typography>
                                        </>
                                    )}
                                    <Typography
                                        component={'span'}
                                        sx={{
                                            color: alpha(
                                                theme.palette.secondary.dark,
                                                0.5
                                            ),
                                        }}
                                    >
                                        {' '}
                                        •{' '}
                                    </Typography>
                                    <Box
                                        component="time"
                                        fontSize={'12px'}
                                        color={alpha(theme.palette.secondary.main, 0.7)}
                                    >
                                        {formatDate(createdAt || new Date(), 'MMM DD')}
                                    </Box>
                                </Stack>
                                {pUser?.id === comment.userId && (
                                    <CommentAction
                                        comment={comment}
                                        setEdit={setEdit}
                                        setInitValue={setInitValue}
                                        t={t}
                                    />
                                )}
                            </Stack>
                            <Box
                                dangerouslySetInnerHTML={{ __html: content }}
                                marginTop={1}
                                sx={{
                                    p: {
                                        lineHeight: '30px',
                                        fontSize: {
                                            lg: '20px',
                                            xs: '1rem',
                                        },
                                        color: '#171717',
                                        fontWeight: 400,
                                    },
                                    '.mention': {
                                        fontWeight: 500,
                                        backgroundColor: alpha(
                                            theme.palette.primary.dark,
                                            0.125
                                        ),
                                        color: theme.palette.primary.dark,
                                        padding: theme.spacing(0.25, 0.5),
                                        borderRadius: theme.spacing(0.75),
                                    },
                                }}
                            />
                        </Paper>
                    )}

                    {loadingUpdate && <SkeletonCommentItem />}

                    {edit && !loadingUpdate && (
                        <CommentInput
                            initValue={initValue}
                            onCommentChange={handleUpdateComment}
                            isReply={isReply}
                            isEdit={!!edit?.id}
                            setIsReply={setIsReply}
                            setEdit={setEdit}
                            t={t}
                        />
                    )}

                    {/* Button Comment: Like, Reply */}
                    <Box marginTop={1}>
                        {isReply && !loadingReply && (
                            <CommentInput
                                initValue={initValue}
                                onCommentChange={handleReplyComment}
                                isReply={isReply}
                                setIsReply={setIsReply}
                                t={t}
                            />
                        )}

                        <Stack
                            direction={'row'}
                            gap={{
                                lg: 1,
                                xs: 0.5,
                            }}
                            sx={{
                                button: {
                                    width: 'auto',
                                    backgroundColor: alpha(
                                        theme.palette.secondary.dark,
                                        0.05
                                    ),
                                    color: alpha(theme.palette.secondary.main, 0.9),
                                    fontSize: theme.typography.body2,
                                    padding: theme.spacing(0.75, 1.5),

                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    },
                                },
                            }}
                        >
                            {!isReply && !edit?.id && !loadingReply && !loadingUpdate && (
                                <>
                                    <ButtonLikeComment
                                        text={t('button.likes') as string}
                                        comment={comment}
                                        user={pUser as IUser}
                                        news={news as INews}
                                    />
                                    <ButtonIconForm
                                        num={comment.numReplyComments}
                                        text={t('button.reply') as string}
                                        icon={RiChat1Line}
                                        onButtonClick={() =>
                                            handleShowInputReply(comment.user as IUser)
                                        }
                                    />
                                </>
                            )}
                        </Stack>
                    </Box>

                    {/* Comment Children */}
                    {childrenComments && childrenComments.length > 0 && (
                        <Box marginTop={comment.parentCommentId ? 0 : 2.5}>
                            <CommentList
                                comments={newChildrenComments}
                                t={t}
                                borderLeft={`1px solid ${alpha(
                                    theme.palette.secondary.main,
                                    0.075
                                )}`}
                                paddingLeft={1.5}
                            />
                        </Box>
                    )}
                    {loadingReply && <SkeletonCommentItem marginTop={3} />}
                </Box>
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
        pIncreaseNumComments: () => dispatch(increaseNumComment()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
