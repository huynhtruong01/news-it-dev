import { PayloadAction } from '@reduxjs/toolkit'
import { IHashTagStore } from '.'
import { IHashTag } from '../../models'

export const reducers = {
    addHashTag(state: IHashTagStore, action: PayloadAction<IHashTag>) {
        const newHashTags = state.hashTags
        newHashTags.unshift(action.payload)
        state.hashTags = newHashTags
        state.total = state.total + 1
    },
    updateHashTag(state: IHashTagStore, action: PayloadAction<IHashTag>) {
        const newHashTags = state.hashTags
        const index = newHashTags.findIndex((h) => h.id === action.payload.id)
        if (index >= 0) {
            newHashTags[index] = action.payload
            state.hashTags = newHashTags
        }
    },
    deleteHashTag(state: IHashTagStore, action: PayloadAction<number>) {
        const newHashTags = state.hashTags
        const index = newHashTags.findIndex((h) => h.id === action.payload)
        if (index >= 0) {
            newHashTags.splice(index, 1)
            state.hashTags = newHashTags
            state.total = state.total - 1
        }
    },
}
