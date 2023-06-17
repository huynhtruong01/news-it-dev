import { INews } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'
import { reducers } from './reducer'

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
    reducers,
    extraReducers,
})

export const { addNews, updateNews, deleteNews } = newsSlice.actions
export default newsSlice.reducer
