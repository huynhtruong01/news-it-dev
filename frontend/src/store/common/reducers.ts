import { PayloadAction } from '@reduxjs/toolkit'
import { ICommonStore } from '.'

export const reducers = {
    setShowModalAuth(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalAuth = action.payload
    },
    setShowModalDelete(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalDelete = action.payload
    },
    setShowModalDeleteComment(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalDeleteComment = action.payload
    },
}
