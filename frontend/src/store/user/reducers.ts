import { PayloadAction } from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { INews, IUser } from '@/models'
import { removeLs } from '@/utils'

export const reducers = {
    saveUserLogin(state: IUserStore, action: PayloadAction<IUser | null>) {
        state.user = action.payload
    },
    signout(state: IUserStore) {
        state.user = null
        state.userProfileFilter = null

        removeLs(import.meta.env.VITE_ACCESS_TOKEN_KEY)
        removeLs(import.meta.env.VITE_REFRESH_TOKEN_KEY)
    },
    deleteNewsUser: (state: IUserStore, action: PayloadAction<number>) => {
        const newsList = [...((state.user?.news as INews[]) || [])]
        const user = state.user
        const news = newsList.find((n) => n.id === action.payload)
        if (news) {
            const newNewsList = newsList.filter((n) => n.id !== news.id)

            if (user?.id) {
                state.user = {
                    ...user,
                    news: newNewsList,
                    newsCount: (user.newsCount || 0) - 1,
                } as IUser
            }
        }
    },
}
