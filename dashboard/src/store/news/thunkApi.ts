import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { INewsStore } from '.'
import { newsApi } from '../../api'
import { IFilters, INewsRes } from '../../models'

export const getNews = createAsyncThunk('news/getNews', async (params: IFilters) => {
    const result = await newsApi.getNews(params)
    return result.data
})

export const extraReducers = (builders: ActionReducerMapBuilder<INewsStore>) => {
    builders.addCase(
        getNews.fulfilled,
        (state: INewsStore, action: PayloadAction<INewsRes>) => {
            state.news = action.payload.news
            state.total = action.payload.total
        }
    )
}
