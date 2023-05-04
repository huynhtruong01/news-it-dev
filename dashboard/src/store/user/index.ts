import { IUser } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'

export interface IUserStore {
    users: IUser[]
    accessToken: string
    refreshToken: string
}

const initialState: IUserStore = {
    users: [],
    accessToken: '',
    refreshToken: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers,
})

export default userSlice.reducer
