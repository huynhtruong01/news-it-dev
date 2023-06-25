import { PayloadAction } from '@reduxjs/toolkit'
import { INewsStore } from '.'
import { INews } from '../../models'

export const reducers = {
    addNews(state: INewsStore, action: PayloadAction<INews>) {
        const newNews = state.news
        newNews.push(action.payload)
        state.news = newNews
        state.total = state.total + 1
    },
    updateNews(state: INewsStore, action: PayloadAction<INews>) {
        const newNews = state.news
        const index = newNews.findIndex((h) => h.id === action.payload.id)
        if (index >= 0) {
            newNews[index] = action.payload
            state.news = newNews
        }
    },
    deleteNews(state: INewsStore, action: PayloadAction<number>) {
        const newNews = state.news
        const index = newNews.findIndex((h) => h.id === action.payload)
        if (index >= 0) {
            newNews.splice(index, 1)
            state.news = newNews
            state.total = state.total - 1
        }
    },
}
