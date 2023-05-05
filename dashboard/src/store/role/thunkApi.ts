import { IFilters, IRole, IRoleData, IRoleRes } from '../../models'
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { IRoleStore } from '.'
import { rolesApi } from '../../api'

export const getRoles = createAsyncThunk('role/getRoles', async (params: IFilters) => {
    const result = await rolesApi.getRoles(params)
    return result.data
})

export const addRole = createAsyncThunk('role/addRole', async (data: IRoleData) => {
    const result = await rolesApi.addRole(data)
    console.log('result add role: ', result)
    return result.data.role
})

export const updateRole = createAsyncThunk('role/updateRole', async (data: IRoleData) => {
    const result = await rolesApi.updateRole(data)
    console.log('result add role: ', result)
    return result.data.role
})

export const extraReducers = (builders: ActionReducerMapBuilder<IRoleStore>) => {
    builders.addCase(
        getRoles.fulfilled,
        (state: IRoleStore, action: PayloadAction<IRoleRes>) => {
            state.roles = action.payload.roles
            state.total = action.payload.total
        }
    )
}
