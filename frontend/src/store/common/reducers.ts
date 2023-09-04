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
    setShowModalDeleteAccount(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalDeleteAccount = action.payload
    },
    setLanguages(state: ICommonStore, action: PayloadAction<string>) {
        state.languages = action.payload
    },
    setShowModalDeleteNotify(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalDeleteNotify = action.payload
    },
    setShowModalDeleteAllNotify(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalDeleteAllNotify = action.payload
    },
    setShowModalUnSaveReading(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalUnSaveReading = action.payload
    },
    setShowModalPublicNews(state: ICommonStore, action: PayloadAction<boolean>) {
        state.isShowModalPublicNews = action.payload
    },
    setLoadingCommon(state: ICommonStore, action: PayloadAction<boolean>) {
        state.loadingCommon = action.payload
    },
    setLoadingComment(state: ICommonStore, action: PayloadAction<boolean>) {
        state.loadingComment = action.payload
    },
}
