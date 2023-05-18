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
            newComments.push(action.payload)
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
}
