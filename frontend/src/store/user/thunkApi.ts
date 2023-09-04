import { authApi, hashTagApi, notifyApi, userApi } from '@/api'
import { NotifyType } from '@/enums'
import {
    IFacebookLoginParams,
    IFiltersUserNews,
    IFollowNotify,
    IHashTag,
    INotifyData,
    IUser,
} from '@/models'
import { setLs } from '@/utils'
import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { IUserStore } from '.'

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
    async ({ id, filters }: IProfileFilters, { rejectWithValue }) => {
        try {
            const result = await userApi.getSaveNewsFilters(id, filters)
            return result.data.user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

// login google
export const googleLogin = createAsyncThunk(
    'user/googleLogin',
    async (token: string, { rejectWithValue }) => {
        try {
            const result = await authApi.googleLogin(token)
            setLs(import.meta.env.VITE_ACCESS_TOKEN_KEY, result.data.accessToken)
            setLs(import.meta.env.VITE_REFRESH_TOKEN_KEY, result.data.refreshToken)

            return result.data.user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

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

        const { user, userFollow } = data
        const notify: INotifyData = {
            userId: user.id,
            newsId: null,
            user,
            news: null,
            recipients: [userFollow],
            readUsers: [],
            text: 'follow you',
            type: NotifyType.FOLLOW,
        }
        await notifyApi.followNotify(notify)
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

export const followHashTag = createAsyncThunk(
    'user/followHashTag',
    async (data: IHashTag, { rejectWithValue }) => {
        try {
            await hashTagApi.followHashTag(data.id)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const unfollowHashTag = createAsyncThunk(
    'user/unfollowHashTag',
    async (data: IHashTag, { rejectWithValue }) => {
        try {
            await hashTagApi.unfollowHashTag(data.id)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<IUserStore>) => {
    builders
        .addCase(
            getProfile.fulfilled,
            (state: IUserStore, action: PayloadAction<IUser>) => {
                state.user = action.payload
            }
        )
        .addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })

    builders
        .addCase(
            getProfileFilters.fulfilled,
            (state: IUserStore, action: PayloadAction<IUser>) => {
                state.userProfileFilter = action.payload
            }
        )
        .addCase(getProfileFilters.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })

    builders
        .addCase(
            googleLogin.fulfilled,
            (state: IUserStore, action: PayloadAction<IUser>) => {
                state.user = action.payload
            }
        )
        .addCase(googleLogin.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })

    builders.addCase(
        facebookLogin.fulfilled,
        (state: IUserStore, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    )

    builders
        .addCase(followUserApi.fulfilled, () => {
            return
        })
        .addCase(followUserApi.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })

    builders
        .addCase(
            followHashTag.fulfilled,
            (state: IUserStore, action: PayloadAction<IHashTag>) => {
                const newUser = { ...state.user }
                newUser.hashTags?.push(action.payload)
                state.user = newUser as IUser
            }
        )
        .addCase(followHashTag.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })

    builders
        .addCase(
            unfollowHashTag.fulfilled,
            (state: IUserStore, action: PayloadAction<IHashTag>) => {
                if (action.payload) {
                    const newUser = { ...state.user }
                    const index = newUser.hashTags?.findIndex(
                        (t) => t.id === action.payload.id
                    ) as number
                    if (index > 0) {
                        newUser.hashTags?.splice(index, 1)
                        state.user = newUser as IUser
                    }
                }
            }
        )
        .addCase(unfollowHashTag.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })
}
