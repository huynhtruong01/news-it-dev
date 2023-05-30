import { INotify } from '@/models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from '@/store/notify/thunkApi'
import { reducers } from '@/store/notify/reducers'

export interface INotifyStore {
    notifications: INotify[]
    notificationsFilter: INotify[]
    numNotifications: number
    total: number
    totalFilter: number
}

const initialState: INotifyStore = {
    notifications: [],
    notificationsFilter: [],
    numNotifications: 0,
    total: 0,
    totalFilter: 0,
}

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers,
    extraReducers,
})

export const { addNotify, resetNotify, readUserNotify, deleteNotify } =
    notifySlice.actions
export default notifySlice.reducer
