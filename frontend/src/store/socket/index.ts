import { reducers } from '@/store/socket/reducers'
import { createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

export interface ISocketStore {
    socket: Socket | null
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
