import { IUser } from '@/models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from '@/store/user/thunkApi'
import { reducers } from '@/store/user/reducers'

export interface IUserStore {
    users: IUser[]
    user: IUser | null
    total: number
    accessToken: string
    refreshToken: string
}

const initialState: IUserStore = {
    users: [],
    user: null,
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

export const { saveUserLogin } = userSlice.actions
export default userSlice.reducer