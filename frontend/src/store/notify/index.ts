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
    notify: INotify | null
}

const initialState: INotifyStore = {
    notifications: [],
    notificationsFilter: [],
    numNotifications: 0,
    total: 0,
    totalFilter: 0,
    notify: null,
}

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers,
    extraReducers,
})

export const {
    addNotify,
    resetNotify,
    readUserNotify,
    deleteNotify,
    setNotificationFilters,
    setNotify,
    resetNotifies,
} = notifySlice.actions
export default notifySlice.reducer
