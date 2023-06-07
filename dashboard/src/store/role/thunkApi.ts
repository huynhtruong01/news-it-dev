import { IFilters, IRole, IRoleData, IRoleRes } from '../../models'
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { IRoleStore } from '.'
import { rolesApi } from '../../api'
import { generateOptions } from '../../utils'

export const getAllRoles = createAsyncThunk('role/getAllRoles', async () => {
    const result = await rolesApi.getAllRoles()
    return result.data.roles
})

export const getRoles = createAsyncThunk('role/getRoles', async (params: IFilters) => {
    const result = await rolesApi.getRoles(params)
    return result.data
})

export const addRole = createAsyncThunk('role/addRole', async (data: IRoleData) => {
    const result = await rolesApi.addRole(data)
    return result.data.role
})

export const updateRole = createAsyncThunk('role/updateRole', async (data: IRoleData) => {
    const result = await rolesApi.updateRole(data)
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
    builders.addCase(
        getAllRoles.fulfilled,
        (state: IRoleStore, action: PayloadAction<IRole[]>) => {
            const newRoleSelects = generateOptions(action.payload)
            state.roleSelects = newRoleSelects
        }
    )
}
