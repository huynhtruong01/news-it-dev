import { commentApi } from '@/api'
import { ButtonLikeComment, CommentAction } from '@/components/Comment/components'
import { ButtonIconForm } from '@/components/Common'
import { IComment, ICommentData, IUser } from '@/models'
import { AppState } from '@/store'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, Paper, Stack, Typography, alpha } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { RiChat3Line } from 'react-icons/ri'
import { connect } from 'react-redux'
import { CommentInput, CommentList } from '.'

export interface ICommentItemProps {
    pUser: IUser | null
    pReplyComment: (data: ICommentData) => Promise<PayloadAction<unknown>>
    pUpdateComment: (data: ICommentData) => Promise<PayloadAction<unknown>>
    pUpdateCommentReply: (data: ICommentData) => Promise<PayloadAction<unknown>>
    comment: IComment
}

function CommentItem({
    pUser,
    comment,
}: // pReplyComment,
// pUpdateComment,
// pUpdateCommentReply,
ICommentItemProps) {
    const [isReply, setIsReply] = useState<boolean>(false)
    const [initValue, setInitValue] = useState<string>('')
    const [edit, setEdit] = useState<IComment | null>(null)
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [loadingReply, setLoadingReply] = useState<boolean>(false)

    const { comment: content, user, childrenComments, newsId, createdAt } = comment

    const newChildrenComments = useMemo(() => {
        return childrenComments?.length ? childrenComments : []
    }, [comment])

    const handleShowInputReply = () => {
        setIsReply(true)
    }

    const handleReplyComment = async (value: string) => {
        try {
            setIsReply(false)
            setLoadingReply(true)

            const newComment: ICommentData = {
                userId: pUser?.id as number,
                newsId,
                comment: value,
                parentCommentId: comment.parentCommentId
                    ? comment.parentCommentId
                    : comment.id,
            }

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

    return (
        <Box marginBottom={2}>
            <Stack direction={'row'} gap={2}>
                {!loadingUpdate && (
                    <Box>
                        <Avatar
                            src={user?.avatar}
                            alt={user?.username}
                            sx={{
                                width: 32,
                                height: 32,
                            }}
                        />
                    </Box>
                )}

                <Box flex={1}>
                    {!edit && (
                        <Paper
                            elevation={1}
                            sx={{
                                padding: theme.spacing(1.5, 1.75, 2.5),
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
                                        marginRight={1.5}
                                        fontWeight={500}
                                        fontSize={'1rem'}
                                    >
                                        {user?.username}
                                    </Typography>
                                    <Box component="time" fontSize={'14px'}>
                                        {formatDate(createdAt || new Date(), 'MMM DD')}
                                    </Box>
                                </Box>
                                {pUser?.id === comment.userId && (
                                    <CommentAction
                                        comment={comment}
                                        setEdit={setEdit}
                                        setInitValue={setInitValue}
                                    />
                                )}
                            </Stack>
                            <Box
                                dangerouslySetInnerHTML={{ __html: content }}
                                marginTop={1}
                                sx={{
                                    p: {
                                        lineHeight: '30px',
                                        fontSize: '20px',
                                        margin: theme.spacing(0, 0, 2.5, 0),
                                        color: theme.palette.secondary.main,
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
                        />
                    )}

                    {/* Button Comment: Like, Reply */}
                    <Box marginTop={2}>
                        {isReply && !loadingReply && (
                            <CommentInput
                                initValue={initValue}
                                onCommentChange={handleReplyComment}
                                isReply={isReply}
                                setIsReply={setIsReply}
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
                            gap={1}
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
                                        comment={comment}
                                        user={pUser as IUser}
                                    />
                                    <ButtonIconForm
                                        text={'Reply'}
                                        icon={RiChat3Line}
                                        onButtonClick={handleShowInputReply}
                                    />
                                </>
                            )}
                        </Stack>
                    </Box>

                    {/* Comment Children */}
                    <Box marginTop={comment.parentCommentId ? 0 : 4}>
                        <CommentList comments={newChildrenComments} />
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

// const mapDispatchProps = (dispatch: AppDispatch) => {
//     return {
//         pReplyComment: (data: ICommentData) => dispatch(replyComment(data)),
//         pUpdateComment: (data: ICommentData) => dispatch(updateComment(data)),
//         pUpdateCommentReply: (data: ICommentData) => dispatch(updateCommentReply(data)),
//     }
// }

export default connect(mapStateToProps, null)(CommentItem)
