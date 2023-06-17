import { IUser } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'
import { reducers } from './reducer'

export interface IUserStore {
    users: IUser[]
    userLogin: IUser | null
    total: number
    accessToken: string
    refreshToken: string
}

const initialState: IUserStore = {
    users: [],
    userLogin: null,
    total: 0,
    accessToken: '',
    refreshToken: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers,
    extraReducers,
})

export const { saveUserLogin, addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
