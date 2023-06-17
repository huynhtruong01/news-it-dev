import { PayloadAction } from '@reduxjs/toolkit'
import { ICommonStore } from '.'

export const reducers = {
    showModalLogout: (state: ICommonStore, action: PayloadAction<boolean>) => {
        state.isShowModalLogout = action.payload
    },
}
