import { INews } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'

export interface INewsStore {
    news: INews[]
    total: number
}

const initialState: INewsStore = {
    news: [],
    total: 0,
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers,
})

export default newsSlice.reducer
