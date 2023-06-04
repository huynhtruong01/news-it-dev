import { IFollowNotify, INews, IUser } from '@/models'
import { resetNotify } from '@/store/notify'
import { removeLs } from '@/utils'
import { PayloadAction } from '@reduxjs/toolkit'
import { IUserStore } from '.'

export const reducers = {
    saveUserLogin(state: IUserStore, action: PayloadAction<IUser | null>) {
        state.user = { ...state.user, ...action.payload }
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
    followUser: (state: IUserStore, action: PayloadAction<IUser>) => {
        // check user in following
        const user = state.user
        const userFollow = action.payload

        const includesUserFollowing = user?.following?.some((u) => u.id === userFollow.id)

        if (!includesUserFollowing) {
            user?.following?.push(userFollow)
        }

        state.user = user
    },
    unfollowUser: (state: IUserStore, action: PayloadAction<IUser>) => {
        // check user in following
        const user = state.user
        const userFollow = action.payload

        const index = user?.following?.findIndex((u) => u.id === userFollow.id) as number

        if (index > -1) {
            user?.following?.splice(index, 1)
        }

        state.user = user
    },
    likeNews: (state: IUserStore, action: PayloadAction<INews>) => {
        const user = state.user
        const news = action.payload

        const includesNews = user?.newsLikes?.find((n) => n.id === news.id)
        if (!includesNews) {
            user?.newsLikes?.push(news)
        }

        state.user = user
    },
    unlikeNews: (state: IUserStore, action: PayloadAction<INews>) => {
        const user = state.user
        const news = action.payload

        const index = user?.newsLikes?.findIndex((n) => n.id === news.id) as number
        if (index > -1) {
            user?.newsLikes?.splice(index, 1)
        }

        state.user = user
    },
    saveNews: (state: IUserStore, action: PayloadAction<INews>) => {
        const user = state.user
        const news = action.payload

        const includesNews = user?.saves?.find((n) => n.id === news.id)
        if (!includesNews) {
            user?.saves?.push(news)
        }

        state.user = user
    },
    unsaveNews: (state: IUserStore, action: PayloadAction<INews>) => {
        const user = state.user
        const news = action.payload

        const index = user?.saves?.findIndex((n) => n.id === news.id) as number
        if (index > -1) {
            user?.saves?.splice(index, 1)
        }

        state.user = user
    },
    unsaveUserFiltersNews: (state: IUserStore, action: PayloadAction<INews>) => {
        const userFilters = state.userProfileFilter
        const user = state.user
        const news = action.payload

        const indexFilters = userFilters?.saves?.findIndex(
            (n) => n.id === news.id
        ) as number
        const index = user?.saves?.findIndex((n) => n.id === news.id) as number

        if (indexFilters > -1) {
            userFilters?.saves?.splice(indexFilters, 1)
        }
        if (index > -1) {
            user?.saves?.splice(index, 1)
        }

        state.userProfileFilter = userFilters
        state.user = user
    },
}
