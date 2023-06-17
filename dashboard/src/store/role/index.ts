import { IRole, IOptionItem } from './../../models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunkApi'
import { reducers } from './reducer'

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
    reducers,
    extraReducers,
})

export const { addRole, updateRole, deleteRole } = roleSlice.actions
export default roleSlice.reducer
