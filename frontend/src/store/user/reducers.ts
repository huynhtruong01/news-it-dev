import { IFollowNotify, INews, IUser } from '@/models'
import { resetNotify } from '@/store/notify'
import { removeLs } from '@/utils'
import { PayloadAction } from '@reduxjs/toolkit'
import { IUserStore } from '.'

export const reducers = {
    saveUserLogin(state: IUserStore, action: PayloadAction<IUser | null>) {
        state.user = action.payload
    },
    signout(state: IUserStore) {
        state.user = null
        state.userProfileFilter = null

        removeLs(import.meta.env.VITE_ACCESS_TOKEN_KEY)
        removeLs(import.meta.env.VITE_REFRESH_TOKEN_KEY)

        resetNotify()
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
    followNotify: (state: IUserStore, action: PayloadAction<IFollowNotify>) => {
        const { socket, user, userFollow } = action.payload
        socket.emit('followNotify', { user, userFollow })
    },
}
