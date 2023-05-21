import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { commentApi } from '@/api'
import { ICommentStore } from '.'
import { IComment, ICommentData, ICommentRes, IFilters } from '@/models'

export const getAllCommentsById = createAsyncThunk(
    'comment/getAllCommentsById',
    async (params: IFilters) => {
        const results = await commentApi.getAllCommentsById(params)

        return results.data
    }
)

export const createComment = createAsyncThunk(
    'comment/createComment',
    async (data: ICommentData) => {
        const results = await commentApi.createComment(data)

        return results.data.comment
    }
)

export const replyComment = createAsyncThunk(
    'comment/replyComment',
    async (data: ICommentData) => {
        const results = await commentApi.replyComment(data)

        return results.data.comment
    }
)

export const updateComment = createAsyncThunk(
    'comment/updateComment',
    async (data: ICommentData) => {
        const results = await commentApi.updateComment(data)

        return results.data.comment
    }
)

export const updateCommentReply = createAsyncThunk(
    'comment/updateCommentReply',
    async (data: ICommentData) => {
        const results = await commentApi.updateCommentReply(data)

        return results.data.comment
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<ICommentStore>) => {
    builders.addCase(
        getAllCommentsById.fulfilled,
        (state: ICommentStore, action: PayloadAction<ICommentRes>) => {
            state.comments = action.payload.comments
            state.total = action.payload.total
        }
    )

    builders.addCase(
        createComment.fulfilled,
        (state: ICommentStore, action: PayloadAction<IComment>) => {
            const newComments = [...state.comments]
            newComments.unshift(action.payload)
            state.comments = newComments
        }
    )

    builders.addCase(
        replyComment.fulfilled,
        (state: ICommentStore, action: PayloadAction<IComment>) => {
            const newComments = [...state.comments]
            const index = newComments.findIndex(
                (comment) => comment.id === action.payload.id
            )
            if (index > -1) {
                newComments[index] = action.payload
                state.comments = newComments
            }
        }
    )

    builders.addCase(
        updateComment.fulfilled,
        (state: ICommentStore, action: PayloadAction<IComment>) => {
            const newComments = [...state.comments]
            const index = newComments.findIndex(
                (comment) => comment.id === action.payload.id
            )
            if (index > -1) {
                newComments[index] = action.payload
                state.comments = newComments
            }
        }
    )

    builders.addCase(
        updateCommentReply.fulfilled,
        (state: ICommentStore, action: PayloadAction<IComment>) => {
            const newComments = [...state.comments]
            const index = newComments.findIndex((c) => c.id === action.payload.id)

            if (index > -1) {
                newComments[index] = action.payload

                state.comments = newComments
            }

            // if (comment) {
            //     const index = comment.childrenComments?.findIndex(
            //         (c) => c.id === action.payload.id
            //     ) as number
            //     if (index > -1) {
            //         ;(comment.childrenComments as IComment[])[index] = action.payload

            //         const indexComment = newComments.findIndex(
            //             (c) => c.id === action.payload.parentCommentId
            //         )
            //         if (indexComment > -1) {
            //             newComments[indexComment] = comment
            //         }
            //     }
            // }
        }
    )
}
