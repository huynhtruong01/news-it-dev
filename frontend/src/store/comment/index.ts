import { IComment } from '@/models'
import { extraReducers } from '@/store/comment/thunkApi'
import { createSlice } from '@reduxjs/toolkit'
import { reducers } from '@/store/comment/reducers'

export interface ICommentStore {
    comments: IComment[]
    total: number
    comment: IComment | null
}

const initialState: ICommentStore = {
    comments: [],
    total: 0,
    comment: null,
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers,
    extraReducers,
})

export const {
    setComment,
    createComment,
    replyComment,
    updateComment,
    updateCommentReply,
    deleteComment,
    likeComment,
    unlikeComment,
} = commentSlice.actions
export default commentSlice.reducer
