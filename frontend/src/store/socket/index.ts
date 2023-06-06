import { reducers } from '@/store/socket/reducers'
import { createSlice } from '@reduxjs/toolkit'

export interface ISocketStore {
    socket: any
}

const initialState: ISocketStore = {
    socket: null,
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers,
    extraReducers: {},
})

export const { setValuesSocket } = socketSlice.actions
export default socketSlice.reducer
