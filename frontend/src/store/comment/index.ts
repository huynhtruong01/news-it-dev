import { IComment } from '@/models'
import { extraReducers } from '@/store/comment/thunkApi'
import { createSlice } from '@reduxjs/toolkit'

export interface ICommentStore {
    comments: IComment[]
    total: number
}

const initialState: ICommentStore = {
    comments: [],
    total: 0,
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers,
})

export default commentSlice.reducer
