import { commentApi, notifyApi } from '@/api'
import { NotifyType } from '@/enums'
import {
    IComment,
    ICommentData,
    ICommentLikeNotify,
    ICommentRes,
    IFilters,
    INotifyData,
    IUser,
} from '@/models'
import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { ICommentStore } from '.'
import {} from './../../models/notify'

export const getAllCommentsById = createAsyncThunk(
    'comment/getAllCommentsById',
    async (params: IFilters) => {
        const results = await commentApi.getAllCommentsById(params)

        return results.data
    }
)

export const getAllCommentsByIdLoadMore = createAsyncThunk(
    'comment/getAllCommentsByIdLoadMore',
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

export const likeCommentNotify = createAsyncThunk(
    'comment/likeCommentNotify',
    async (data: ICommentLikeNotify) => {
        const { user, comment, news } = data
        const notify: INotifyData = {
            userId: user.id,
            user,
            news,
            newsId: news.id,
            text: 'like your comment',
            recipients: [comment.user as IUser],
            type: NotifyType.LIKE_COMMENT,
        }

        await commentApi.likeComment(comment.id)
        await notifyApi.likeNotify(notify)
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
        }
    )

    builders.addCase(
        getAllCommentsByIdLoadMore.fulfilled,
        (state: ICommentStore, action: PayloadAction<ICommentRes>) => {
            state.comments = [...state.comments, ...action.payload.comments]
        }
    )

    builders.addCase(likeCommentNotify.fulfilled, () => {
        return
    })
}
