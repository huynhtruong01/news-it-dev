import { IComment, IUser } from '@/models'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICommentStore } from '.'

export interface IActionComment {
    comment: IComment
    user: IUser
}

export const reducers = {
    setComment: (state: ICommentStore, action: PayloadAction<IComment | null>) => {
        state.comment = action.payload
    },
    createComment: (state: ICommentStore, action: PayloadAction<IComment>) => {
        const newComments = [...state.comments]
        newComments.unshift(action.payload)
        state.comments = newComments
    },
    replyComment: (state: ICommentStore, action: PayloadAction<IComment>) => {
        const newComments = [...state.comments]
        const index = newComments.findIndex((comment) => comment.id === action.payload.id)
        if (index > -1) {
            newComments[index] = action.payload
            state.comments = newComments
        }
    },
    updateComment: (state: ICommentStore, action: PayloadAction<IComment>) => {
        const newComments = [...state.comments]
        const index = newComments.findIndex((comment) => comment.id === action.payload.id)
        if (index > -1) {
            newComments[index] = action.payload
            state.comments = newComments
        }
    },
    updateCommentReply: (state: ICommentStore, action: PayloadAction<IComment>) => {
        const newComments = [...state.comments]
        const index = newComments.findIndex((c) => c.id === action.payload.id)

        if (index > -1) {
            newComments[index] = action.payload

            state.comments = newComments
        }
    },
    deleteComment: (state: ICommentStore, action: PayloadAction<IComment>) => {
        const newComments = [...state.comments]

        // check parent comment by id
        const comment = action.payload
        if (comment?.parentCommentId) {
            const parentComment = newComments.find(
                (c) => c.id === comment.parentCommentId
            )
            // check remove comment into parent comment
            if (parentComment) {
                parentComment.childrenComments = (
                    parentComment.childrenComments as IComment[]
                ).filter((c) => c.id !== comment.id)
                state.comments = newComments.map((c) => {
                    if (c.id === parentComment.id) return parentComment
                    return c
                })
            }
        } else {
            // else, remove comment by id if it isn't parent comment id
            state.comments = newComments.filter((c) => c.id !== comment.id)
        }
    },
    likeComment: (state: ICommentStore, action: PayloadAction<IActionComment>) => {
        const newComments = [...state.comments]
        const { comment } = action.payload

        const updateComment = { ...comment }

        if (updateComment.parentCommentId) {
            const parentComment = newComments.find(
                (c) => c.id === updateComment.parentCommentId
            )

            if (parentComment) {
                const index = (parentComment.childrenComments as IComment[]).findIndex(
                    (c) => c.id === updateComment.id
                ) as number

                if (index > -1) {
                    // const userLikes = [...(updateComment.likes || []), user]
                    // const numLikes = updateComment.numLikes ?? 0
                    parentComment.childrenComments = parentComment.childrenComments?.map(
                        (c) => {
                            if (c.id === updateComment.id) return { ...updateComment }
                            return c
                        }
                    )
                }

                state.comments = newComments.map((c) => {
                    if (c.id === updateComment.parentCommentId) return parentComment
                    return c
                })
            }
        } else {
            // const userLikes = [...((comment.likes as IUser[]) || []), user]
            // const numLikes = comment.numLikes ?? 0

            const otherComments = newComments.map((c) => {
                // if (c.id === comment.id) return { ...comment, likes: userLikes, numLikes }
                if (c.id === comment.id) return { ...comment }
                return c
            })
            state.comments = otherComments
        }
    },
    unlikeComment: (state: ICommentStore, action: PayloadAction<IActionComment>) => {
        const newComments = [...state.comments]
        const { comment } = action.payload

        const updateComment = { ...comment }

        if (comment.parentCommentId) {
            const parentComment = newComments.find(
                (c) => c.id === comment.parentCommentId
            )

            if (parentComment) {
                const index = (parentComment.childrenComments as IComment[]).findIndex(
                    (c) => c.id === updateComment.id
                ) as number

                if (index > -1) {
                    // const userLikes = comment.likes?.filter((u) => u.id !== user.id)
                    // const numLikes = (comment.numLikes || 0) - 1
                    // ;(parentComment.childrenComments as IComment[])[index] = {
                    //     ...comment,
                    //     likes: userLikes,
                    //     numLikes,
                    // }
                    ;(parentComment.childrenComments as IComment[])[index] = {
                        ...updateComment,
                    }
                }

                state.comments = newComments.map((c) => {
                    if (c.id === updateComment.parentCommentId) return parentComment
                    return c
                })
            }
        } else {
            // const userLikes = comment.likes?.filter((u) => u.id !== user.id)
            // const numLikes = (comment.numLikes ?? 0) - 1
            state.comments = [
                ...newComments.map((c) => {
                    if (c.id === updateComment.id)
                        // return { ...comment, likes: userLikes, numLikes }
                        return { ...updateComment }
                    return c
                }),
            ]
        }
    },
}
