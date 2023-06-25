import { PayloadAction } from '@reduxjs/toolkit'
import { IRoleStore } from '.'
import { IRole } from '../../models'

export const reducers = {
    addRole(state: IRoleStore, action: PayloadAction<IRole>) {
        const newRoles = state.roles
        newRoles.push(action.payload)
        state.roles = newRoles
        state.total = state.total + 1
    },
    updateRole(state: IRoleStore, action: PayloadAction<IRole>) {
        const newRoles = state.roles
        const index = newRoles.findIndex((h) => h.id === action.payload.id)
        if (index >= 0) {
            newRoles[index] = action.payload
            state.roles = newRoles
        }
    },
    deleteRole(state: IRoleStore, action: PayloadAction<number>) {
        const newRoles = state.roles
        const index = newRoles.findIndex((h) => h.id === action.payload)
        if (index >= 0) {
            newRoles.splice(index, 1)
            state.roles = newRoles
            state.total = state.total - 1
        }
    },
}
