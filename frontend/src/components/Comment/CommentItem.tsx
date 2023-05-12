import { ButtonIconForm } from '@/components/Common'
import { IComment } from '@/models'
import { formatDate, theme } from '@/utils'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Avatar, Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { CommentInput } from '.'

export interface ICommentItemProps {
    comment: IComment
}

export function CommentItem({ comment }: ICommentItemProps) {
    const [isReply, setIsReply] = useState<boolean>(false)

    const {
        comment: content,
        user,
        childrenComments,
        parentCommentId,
        id,
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

    const handleReplyComment = (value: string) => {
        console.log('reply comment', value)
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
                    {/* Comment */}
                    <Paper
                        elevation={1}
                        sx={{
                            padding: theme.spacing(1.5, 1.75, 2.5),
                        }}
                    >
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
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
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
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
                        {newChildrenComments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}
