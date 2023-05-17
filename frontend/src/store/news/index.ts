import { createSlice } from '@reduxjs/toolkit'
import { INews, INewsForm } from '@/models'
import { initNewsFormValues } from '@/data'
import { reducers } from '@/store/news/reducers'

export interface INewsStore {
    initValuesForm: INewsForm
    news: INews | null
}

const initialState: INewsStore = {
    initValuesForm: initNewsFormValues,
    news: null,
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers,
})

export default newsSlice.reducer
