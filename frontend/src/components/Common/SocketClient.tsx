import { IComment, IUser } from '@/models'
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
import { Box } from '@mui/material'
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
}: ISocketClientProps) {
    const dispatch: AppDispatch = useDispatch()

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketClient)
