import { ButtonIconForm } from '@/components/Common'
import { IComment, ICommentData, IUser } from '@/models'
import { formatDate, theme } from '@/utils'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { CommentAction, CommentInput, CommentList } from '.'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '@/store'
import { createComment, replyComment } from '@/store/comment/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'

export interface ICommentItemProps {
    pUser: IUser | null
    pReplyComment: (data: ICommentData) => Promise<PayloadAction<unknown>>
    comment: IComment
}

function CommentItem({ pUser, comment, pReplyComment }: ICommentItemProps) {
    const [isReply, setIsReply] = useState<boolean>(false)

    const {
        comment: content,
        user,
        childrenComments,
        newsId,
        numLikes,
        createdAt,
    } = comment

    const newChildrenComments = useMemo(() => {
        return childrenComments?.length ? childrenComments : []
    }, [comment])

    const handleLikeComment = () => {
        console.log('like comment')
    }

    const handleShowInputReply = () => {
        setIsReply(true)
    }

    const handleReplyComment = async (value: string) => {
        try {
            setIsReply(false)
            const newComment: ICommentData = {
                userId: pUser?.id as number,
                newsId,
                comment: value,
                parentCommentId: comment.id,
            }

            console.log('comment reply: ', newComment)
            await pReplyComment(newComment)
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Box marginBottom={2}>
            <Stack direction={'row'} gap={2}>
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

                <Box flex={1}>
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
                                <CommentAction commentId={comment.id} />
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

                    {/* Button Comment: Like, Reply */}
                    <Box marginTop={2}>
                        {isReply && (
                            <CommentInput
                                onCommentChange={handleReplyComment}
                                isReply={isReply}
                                setIsReply={setIsReply}
                            />
                        )}
                        <Stack
                            direction={'row'}
                            gap={1}
                            sx={{
                                button: {
                                    width: 'auto',
                                    backgroundColor: 'transparent',
                                    color: theme.palette.secondary.main,
                                    fontSize: theme.typography.body2,
                                    fontWeight: 400,
                                    padding: theme.spacing(0.75, 1.5),
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    },
                                },
                            }}
                        >
                            {!isReply && (
                                <>
                                    <ButtonIconForm
                                        text={`${numLikes || 0} likes`}
                                        icon={FavoriteBorderIcon}
                                        onButtonClick={handleLikeComment}
                                    />
                                    <ButtonIconForm
                                        text={'Reply'}
                                        icon={ChatBubbleOutlineIcon}
                                        onButtonClick={handleShowInputReply}
                                    />
                                </>
                            )}
                        </Stack>
                    </Box>

                    {/* Comment Children */}
                    <Box marginTop={4}>
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

const mapDispatchProps = (dispatch: AppDispatch) => {
    return {
        pReplyComment: (data: ICommentData) => dispatch(replyComment(data)),
    }
}

export default connect(mapStateToProps, mapDispatchProps)(CommentItem)
