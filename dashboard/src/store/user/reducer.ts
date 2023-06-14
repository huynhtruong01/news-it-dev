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
    },
    updateUser(state: IUserStore, action: PayloadAction<IUser>) {
        const newUsers = state.users
        const index = newUsers.findIndex((u) => u.id === action.payload.id)
        if (index > 0) {
            newUsers[index] = action.payload
            state.users = newUsers
        }
    },
}
