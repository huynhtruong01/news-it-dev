import { PayloadAction } from '@reduxjs/toolkit'
import { IUserStore } from '.'
import { IUser } from '@/models'
import { removeLs } from '@/utils'

export const reducers = {
    saveUserLogin(state: IUserStore, action: PayloadAction<IUser | null>) {
        state.user = action.payload
    },
    signout(state: IUserStore) {
        state.user = null
        state.userProfileFilter = null

        removeLs(import.meta.env.VITE_ACCESS_TOKEN_KEY)
        removeLs(import.meta.env.VITE_REFRESH_TOKEN_KEY)
    },
}
