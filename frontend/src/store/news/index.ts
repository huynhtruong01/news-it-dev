import { createSlice } from '@reduxjs/toolkit'
import { INews, INewsForm } from '@/models'
import { initNewsFormValues } from '@/data'
import { reducers } from '@/store/news/reducers'
import { extraReducers } from '@/store/news/thunkApi'

export interface INewsStore {
    initValuesForm: INewsForm
    news: INews | null
    newsDetail: INews | null
}

const initialState: INewsStore = {
    initValuesForm: initNewsFormValues,
    news: null,
    newsDetail: null,
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers,
    extraReducers,
})

export const {
    setInitValueForm,
    setNews,
    setNewsDetail,
    resetNewsDetail,
    increaseNumComment,
} = newsSlice.actions
export default newsSlice.reducer
