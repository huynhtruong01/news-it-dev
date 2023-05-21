import { PayloadAction } from '@reduxjs/toolkit'
import { ISocketStore } from '.'
import { Socket } from 'socket.io-client'

export const reducers = {
    setValuesSocket: (state: ISocketStore, action: PayloadAction<Socket | null>) => {
        state.socket = action.payload
    },
}
