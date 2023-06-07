import { newsApi } from '@/api'
import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { INewsStore } from '.'
import { INews, INewsActions } from '@/models'

export const getNews = createAsyncThunk('news/getNews', async (slug: string) => {
    const result = await newsApi.getNewsBySlug(slug)
    return result.data.news
})

export const likeNewsApi = createAsyncThunk(
    'news/likeNewsApi',
    async (data: INewsActions) => {
        await newsApi.likeNews(data.news.id)

        return data
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<INewsStore>) => {
    builders.addCase(
        getNews.fulfilled,
        (state: INewsStore, action: PayloadAction<INews>) => {
            state.newsDetail = action.payload
        }
    )

    builders.addCase(
        likeNewsApi.fulfilled,
        (state: INewsStore, action: PayloadAction<INewsActions>) => {
            const { socket, news, user } = action.payload
            const notify = {
                userId: user.id,
                newsId: news.id,
                user,
                news,
                text: 'liked your news',
                recipients: [news.user],
                readUsers: [],
            }
            socket.emit('notifyLikesNews', notify)
        }
    )
}
