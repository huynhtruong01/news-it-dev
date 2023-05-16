import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { userApi } from '@/api'
import { IFiltersUserNews, IUser } from '@/models'

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
}
