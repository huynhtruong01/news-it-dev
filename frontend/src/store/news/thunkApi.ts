import { newsApi } from '@/api'
import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { INewsStore } from '.'
import { INews } from '@/models'

export const getNews = createAsyncThunk('news/getNews', async (slug: string) => {
    const result = await newsApi.getNewsBySlug(slug)
    return result.data.news
})

export const extraReducers = (builders: ActionReducerMapBuilder<INewsStore>) => {
    builders.addCase(
        getNews.fulfilled,
        (state: INewsStore, action: PayloadAction<INews>) => {
            state.newsDetail = action.payload
        }
    )
}
