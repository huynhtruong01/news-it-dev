import { IRole } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'

export interface IRoleStore {
    roles: IRole[]
}

const initialState: IRoleStore = {
    roles: [],
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers,
})

export default roleSlice.reducer
