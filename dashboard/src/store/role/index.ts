import { IRole, IOptionItem } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'

export interface IRoleStore {
    roleSelects: IOptionItem[]
    roles: IRole[]
    total: number
}

const initialState: IRoleStore = {
    roleSelects: [],
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
