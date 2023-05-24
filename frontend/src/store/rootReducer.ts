import { AnyAction, combineReducers, Reducer } from 'redux'
import userSlice from '@/store/user'
import hashTagSlice from '@/store/hashTag'
import commonSlice from '@/store/common'
import newsSlice from '@/store/news'
import commentSlice from '@/store/comment'
import socketSlice from '@/store/socket'
import notifySlice from '@/store/notify'
import { AppState } from '.'

export const DESTROY_ACTION = 'DESTROY_STORE'

export const combinedReducer = combineReducers({
    user: userSlice,
    hashTag: hashTagSlice,
    common: commonSlice,
    news: newsSlice,
    comment: commentSlice,
    socket: socketSlice,
    notify: notifySlice,
})

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
    if (action.type === DESTROY_ACTION) {
        state = {} as AppState
    }
    return combinedReducer(state, action)
}

export default rootReducer
