import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { authApi, userApi } from '@/api'
import { IFacebookLoginParams, IFiltersUserNews, IFollowNotify, IUser } from '@/models'
import { setLs } from '@/utils'

export interface IProfileFilters {
    id: number
    filters: IFiltersUserNews
}

export const getProfile = createAsyncThunk('user/getProfile', async () => {
    const result = await userApi.getProfile()
    return result.data.user
})

export const getProfileFilters = createAsyncThunk(
    'user/getProfileFilters',
    async ({ id, filters }: IProfileFilters) => {
        const result = await userApi.getSaveNewsFilters(id, filters)
        return result.data.user
    }
)

// login google
export const googleLogin = createAsyncThunk('user/googleLogin', async (token: string) => {
    const result = await authApi.googleLogin(token)
    setLs(import.meta.env.VITE_ACCESS_TOKEN_KEY, result.data.accessToken)
    setLs(import.meta.env.VITE_REFRESH_TOKEN_KEY, result.data.refreshToken)

    return result.data.user
})

// login facebook
export const facebookLogin = createAsyncThunk(
    'user/facebook',
    async (data: IFacebookLoginParams) => {
        const { accessToken, userId } = data
        const result = await authApi.facebookLogin(accessToken, userId)

        setLs(import.meta.env.VITE_ACCESS_TOKEN_KEY, result.data.accessToken)
        setLs(import.meta.env.VITE_REFRESH_TOKEN_KEY, result.data.refreshToken)

        return result.data.user
    }
)

// follow
export const followUserApi = createAsyncThunk(
    'user/followUserApi',
    async (data: IFollowNotify) => {
        await userApi.followUser(data.userFollow.id)

        return data
    }
)

// unfollow
export const unfollowUserApi = createAsyncThunk(
    'user/unfollowUserApi',
    async (user: IUser) => {
        await userApi.unfollowUser(user.id)

        return {}
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<IUserStore>) => {
    builders.addCase(
        getProfile.fulfilled,
        (state: IUserStore, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    )

    builders.addCase(
        getProfileFilters.fulfilled,
        (state: IUserStore, action: PayloadAction<IUser>) => {
            state.userProfileFilter = action.payload
        }
    )

    builders.addCase(
        googleLogin.fulfilled,
        (state: IUserStore, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    )

    builders.addCase(
        facebookLogin.fulfilled,
        (state: IUserStore, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    )

    builders.addCase(
        followUserApi.fulfilled,
        (state: IUserStore, action: PayloadAction<IFollowNotify>) => {
            const { socket, user, userFollow } = action.payload
            socket.emit('followNotify', { user, userFollow })
        }
    )

    builders.addCase(unfollowUserApi.fulfilled, (state: IUserStore) => {
        return
    })
}
