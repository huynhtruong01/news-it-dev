import { IRole } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'

export interface IRoleStore {
    roles: IRole[]
    total: number
}

const initialState: IRoleStore = {
    roles: [],
    total: 0,
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers,
})

export default roleSlice.reducer
