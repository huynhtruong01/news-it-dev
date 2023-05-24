import { INotify } from '@/models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from '@/store/notify/thunkApi'

export interface INotifyStore {
    notifications: INotify[]
    numNotifications: number
}

const initialState: INotifyStore = {
    notifications: [],
    numNotifications: 0,
}

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {},
    extraReducers,
})

export default notifySlice.reducer
