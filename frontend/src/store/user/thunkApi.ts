import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { userApi } from '@/api'
import { IUser } from '@/models'

export const getProfile = createAsyncThunk('user/getProfile', async () => {
    const result = await userApi.getProfile()
    return result.data.user
})

export const extraReducers = (builders: ActionReducerMapBuilder<IUserStore>) => {
    builders.addCase(
        getProfile.fulfilled,
        (state: IUserStore, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    )
}
