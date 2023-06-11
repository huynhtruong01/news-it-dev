import { newsApi, notifyApi } from '@/api'
import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { INewsStore } from '.'
import { INews, INewsActions, INotifyData, IUser } from '@/models'
import { NotifyType } from '@/enums'

export const getNews = createAsyncThunk('news/getNews', async (slug: string) => {
    const result = await newsApi.getNewsBySlug(slug)
    return result.data.news
})

export const likeNewsApi = createAsyncThunk(
    'news/likeNewsApi',
    async (data: INewsActions) => {
        await newsApi.likeNews(data.news.id)

        const { news, user } = data
        const notify: INotifyData = {
            userId: user.id,
            newsId: news.id,
            user,
            news,
            text: 'liked your news',
            recipients: [news.user as IUser],
            readUsers: [],
            type: NotifyType.LIKE,
        }

        await notifyApi.likeNotify(notify)

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

    builders.addCase(likeNewsApi.fulfilled, () => {
        return
    })
}
