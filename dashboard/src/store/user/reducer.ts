import { PayloadAction } from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { IUser } from '../../models'

export const reducers = {
    saveUserLogin(state: IUserStore, action: PayloadAction<IUser | null>) {
        state.userLogin = action.payload
    },
    addUser(state: IUserStore, action: PayloadAction<IUser>) {
        const newUsers = state.users
        newUsers.unshift(action.payload)
        state.users = newUsers
        state.total = state.total + 1
    },
    updateUser(state: IUserStore, action: PayloadAction<IUser>) {
        const newUsers = state.users
        const index = newUsers.findIndex((u) => u.id === action.payload.id)
        if (index >= 0) {
            newUsers[index] = action.payload
            state.users = newUsers
        }
    },
    deleteUser(state: IUserStore, action: PayloadAction<number>) {
        const newHashTags = state.users
        const index = newHashTags.findIndex((h) => h.id === action.payload)
        if (index >= 0) {
            newHashTags.splice(index, 1)
            state.users = newHashTags
            state.total = state.total - 1
        }
    },
}
