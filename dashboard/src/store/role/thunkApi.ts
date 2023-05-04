import { IRole } from '../../models'
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { IRoleStore } from '.'
import { rolesApi } from '../../api'

export const getRoles = createAsyncThunk('role/getRoles', async () => {
    const result = await rolesApi.getRoles()
    return result.data.roles
})

export const extraReducers = (builders: ActionReducerMapBuilder<IRoleStore>) => {
    builders.addCase(
        getRoles.fulfilled,
        (state: IRoleStore, action: PayloadAction<IRole[]>) => {
            state.roles = action.payload
        }
    )
}
