import { PayloadAction } from '@reduxjs/toolkit'
import { ICommentStore } from '.'
import { IComment } from '@/models'

export const reducers = {
    setComment: (state: ICommentStore, action: PayloadAction<IComment | null>) => {
        state.comment = action.payload
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
}
