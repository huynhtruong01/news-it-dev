import { IFilters, IUserRes, IUserData } from '../../models'
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { usersApi } from '../../api'

export const getUsers = createAsyncThunk('user/getUsers', async (params: IFilters) => {
    const result = await usersApi.getUsers(params)
    return result.data
})

export const addUser = createAsyncThunk('user/addUser', async (data: IUserData) => {
    await usersApi.addUser(data)
})

export const updateUser = createAsyncThunk('user/updateUser', async (data: IUserData) => {
    await usersApi.updateUser(data)
})

export const extraReducers = (builders: ActionReducerMapBuilder<IUserStore>) => {
    builders.addCase(
        getUsers.fulfilled,
        (state: IUserStore, action: PayloadAction<IUserRes>) => {
            state.users = action.payload.users
            state.total = action.payload.total
        }
    )
}
