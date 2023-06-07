import { IComment, INews, INotify, INotifyData, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import {
    createComment,
    deleteComment,
    likeComment,
    replyComment,
    unlikeComment,
    updateComment,
    updateCommentReply,
} from '@/store/comment'
import { IActionComment } from '@/store/comment/reducers'
import { setNewsDetail } from '@/store/news'
import { addNotify } from '@/store/notify'
import { createNotify } from '@/store/notify/thunkApi'
import { Box } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

export interface ISocketClientProps {
    pSocket: Socket | null
    pUser: IUser | null
    pCreateComment: (data: IComment) => void
    pReplyComment: (data: IComment) => void
    pUpdateComment: (data: IComment) => void
    pUpdateCommentReply: (data: IComment) => void
    pDeleteComment: (data: IComment) => void
    pLikeComment: (data: IActionComment) => void
    pUnLikeComment: (data: IActionComment) => void
    pCreateNotify: (data: INotifyData) => Promise<PayloadAction<unknown>>
    pAddNotify: (data: INotify) => void
    pSetNewsDetail: (data: INews) => void
}

function SocketClient({
    pSocket,
    pUser,
    pCreateComment,
    pReplyComment,
    pUpdateComment,
    pUpdateCommentReply,
    pDeleteComment,
    pLikeComment,
    pUnLikeComment,
    pCreateNotify,
    pAddNotify,
    pSetNewsDetail,
}: ISocketClientProps) {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (!pUser?.id) return
        pSocket?.emit('subscribe', pUser.id.toString())

        return () => {
            pSocket?.emit('unsubscribe', pUser.id.toString())
        }
    }, [dispatch, pUser, pSocket])

    // COMMENT
    useEffect(() => {
        if (!pSocket) return
        pSocket.on('createComment', (data: IComment) => {
            pCreateComment(data)
        })

        return () => {
            pSocket.off('createComment')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket) return
        pSocket.on('replyComment', (data: IComment) => {
            pReplyComment(data)
        })

        return () => {
            pSocket.off('replyComment')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket) return
        pSocket.on('updateComment', (data: IComment) => {
            pUpdateComment(data)
        })

        return () => {
            pSocket.off('updateComment')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket) return
        pSocket.on('updateCommentReply', (data: IComment) => {
            pUpdateCommentReply(data)
        })

        return () => {
            pSocket.off('updateCommentReply')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket) return
        pSocket.on('deleteComment', (data: IComment) => {
            pDeleteComment(data)
        })

        return () => {
            pSocket.off('deleteComment')
        }
    }, [dispatch, pSocket])

    // LIKE COMMENT
    useEffect(() => {
        if (!pSocket || !pUser) return
        pSocket.on('likeComment', (comment: IComment) => {
            pLikeComment({ comment, user: pUser })
        })

        return () => {
            pSocket.off('likeComment')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket || !pUser) return
        pSocket.on('unlikeComment', (comment: IComment) => {
            pUnLikeComment({ comment, user: pUser })
        })

        return () => {
            pSocket.off('unlikeComment')
        }
    }, [dispatch, pSocket])

    // NOTIFY
    useEffect(() => {
        // if (!pSocket) return
        pSocket?.on('notifyNews', (notify: INotify) => {
            pAddNotify(notify)
        })

        return () => {
            pSocket?.off('notifyNews')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket || !pUser) return
        pSocket.on('createNotify', async (notify: INotifyData) => {
            await pCreateNotify(notify)
        })

        return () => {
            pSocket.off('createNotify')
        }
    }, [dispatch, pSocket])

    // LIKE NEWS
    useEffect(() => {
        if (!pSocket || !pUser) return
        pSocket.on('likeNews', (news: INews) => {
            pSetNewsDetail(news)
        })

        return () => {
            pSocket.off('likeNews')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket || !pUser) return
        pSocket.on('unlikeNews', (news: INews) => {
            pSetNewsDetail(news)
        })

        return () => {
            pSocket.off('unlikeNews')
        }
    }, [dispatch, pSocket])

    // SAVE NEWS
    useEffect(() => {
        if (!pSocket || !pUser) return
        pSocket.on('saveNews', (news: INews) => {
            pSetNewsDetail(news)
        })

        return () => {
            pSocket.off('saveNews')
        }
    }, [dispatch, pSocket])

    useEffect(() => {
        if (!pSocket || !pUser) return
        pSocket.on('unsaveNews', (news: INews) => {
            pSetNewsDetail(news)
        })

        return () => {
            pSocket.off('unsaveNews')
        }
    }, [dispatch, pSocket])

    return <Box></Box>
}

const mapStateToProps = (state: AppState) => {
    return {
        pSocket: state.socket.socket,
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pCreateComment: (data: IComment) => dispatch(createComment(data)),
        pReplyComment: (data: IComment) => dispatch(replyComment(data)),
        pUpdateComment: (data: IComment) => dispatch(updateComment(data)),
        pUpdateCommentReply: (data: IComment) => dispatch(updateCommentReply(data)),
        pDeleteComment: (data: IComment) => dispatch(deleteComment(data)),
        pLikeComment: (data: IActionComment) => dispatch(likeComment(data)),
        pUnLikeComment: (data: IActionComment) => dispatch(unlikeComment(data)),
        pCreateNotify: (data: INotifyData) => dispatch(createNotify(data)),
        pAddNotify: (data: INotify) => dispatch(addNotify(data)),
        pSetNewsDetail: (news: INews) => dispatch(setNewsDetail(news)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketClient)
