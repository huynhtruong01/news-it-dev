import { createSlice } from '@reduxjs/toolkit'
import { IComment } from './../../models'
import { extraReducers } from './thunkApi'

export interface ICommentStore {
    commentsDashboard: IComment[]
}

const initialState: ICommentStore = {
    commentsDashboard: [],
}

const roleSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers,
})

export default roleSlice.reducer
