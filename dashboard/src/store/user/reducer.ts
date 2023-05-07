import { PayloadAction } from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { IUser } from '../../models'

export const reducers = {
    saveUserLogin(state: IUserStore, action: PayloadAction<IUser | null>) {
        state.userLogin = action.payload
    },
}
