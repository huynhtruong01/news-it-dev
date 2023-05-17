import { INews, INewsForm } from '@/models'
import { INewsStore } from '@/store/news'
import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
    setInitValueForm: (state: INewsStore, action: PayloadAction<INewsForm>) => {
        state.initValuesForm = action.payload
    },
    setNews: (state: INewsStore, action: PayloadAction<INews | null>) => {
        state.news = action.payload
    },
}
