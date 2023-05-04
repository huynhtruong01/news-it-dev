import { INews } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'

export interface INewsStore {
    news: INews[]
}

const initialState: INewsStore = {
    news: [],
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers,
})

export default newsSlice.reducer
