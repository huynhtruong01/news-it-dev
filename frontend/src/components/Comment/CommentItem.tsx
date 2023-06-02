import { commentApi } from '@/api'
import { ButtonLikeComment, CommentAction } from '@/components/Comment/components'
import { ButtonIconForm } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { IComment, ICommentData, IUser } from '@/models'
import { AppState } from '@/store'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, Paper, Stack, Typography, alpha } from '@mui/material'
import { TFunction } from 'i18next'
import { enqueueSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { RiChat1Line } from 'react-icons/ri'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CommentInput, CommentList } from '.'

export interface ICommentItemProps {
    pUser: IUser | null
    // pReplyComment: (data: ICommentData) => Promise<PayloadAction<unknown>>
    // pUpdateComment: (data: ICommentData) => Promise<PayloadAction<unknown>>
    // pUpdateCommentReply: (data: ICommentData) => Promise<PayloadAction<unknown>>
    comment: IComment
    t: TFunction<'translation', undefined, 'translation'>
}

function CommentItem({ pUser, comment, t }: ICommentItemProps) {
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
        replyUserId,
        replyUser: replyUserData,
        createdAt,
    } = comment

    const newChildrenComments = useMemo(() => {
        return childrenComments?.length ? childrenComments : []
    }, [comment])

    const handleShowInputReply = (user: IUser) => {
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

            setReplyUser(null)

            await commentApi.replyComment(newComment)
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
            setLoadingUpdate(false)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    const handleNavReply = (userId: number, username: string): string => {
        if (userId === pUser?.id) return `/profile`
        return `/profile/${username}`
    }

    return (
        <Box marginBottom={2}>
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
                                src={user?.avatar}
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
                    {!edit && (
                        <Paper
                            elevation={1}
                            sx={{
                                padding: theme.spacing(1.5),
                            }}
                        >
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'flex-start'}
                            >
                                <Box>
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
                                                        ? 'you'
                                                        : replyUserData.username}
                                                </Link>
                                            </Typography>
                                        </>
                                    )}
                                    <span> • </span>
                                    <Box
                                        component="time"
                                        fontSize={'12px'}
                                        color={alpha(theme.palette.secondary.main, 0.7)}
                                    >
                                        {formatDate(createdAt || new Date(), 'MMM DD')}
                                    </Box>
                                </Box>
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
                                marginTop={1.75}
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
                                }}
                            />
                        </Paper>
                    )}

                    {loadingUpdate && (
                        <Typography
                            sx={{
                                textAlign: 'center',
                                color: theme.palette.primary.main,
                            }}
                        >
                            Update comment...
                        </Typography>
                    )}

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
                        {loadingReply && (
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    color: theme.palette.primary.main,
                                }}
                            >
                                Reply comment...
                            </Typography>
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
                                    backgroundColor: 'transparent',
                                    color: alpha(theme.palette.secondary.main, 0.9),
                                    fontSize: theme.typography.body2,
                                    padding: theme.spacing(0.75, 1.5),

                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    },
                                },
                            }}
                        >
                            {!isReply && !edit?.id && !loadingReply && (
                                <>
                                    <ButtonLikeComment
                                        text={t('button.likes') as string}
                                        comment={comment}
                                        user={pUser as IUser}
                                    />
                                    <ButtonIconForm
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
                    <Box
                        marginTop={
                            comment.parentCommentId
                                ? 0
                                : {
                                      md: 4,
                                      xs: 2,
                                  }
                        }
                    >
                        <CommentList comments={newChildrenComments} t={t} />
                    </Box>
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

export default connect(mapStateToProps, null)(CommentItem)
