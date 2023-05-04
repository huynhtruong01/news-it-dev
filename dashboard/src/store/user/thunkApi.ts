import { usersApi } from '../../api'
import { IUserStore } from '.'
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { IUser } from '@/models'

export const getUsers = createAsyncThunk('user/getUsers', async () => {
    const result = await usersApi.getUsers()
    console.log('result:', result)
    return result.data.users
})

export const extraReducers = (builders: ActionReducerMapBuilder<IUserStore>) => {
    builders.addCase(
        getUsers.fulfilled,
        (state: IUserStore, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        }
    )
}
