import { AnyAction, combineReducers, Reducer } from 'redux'
import userSlice from './user'
import roleSlice from './role'
import hashTagSlice from './hashTag'
import newsSlice from './news'
import { AppState } from '.'

export const DESTROY_ACTION = 'DESTROY_STORE'

export const combinedReducer = combineReducers({
    user: userSlice,
    role: roleSlice,
    hashTag: hashTagSlice,
    news: newsSlice,
})

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
    if (action.type === DESTROY_ACTION) {
        state = {} as AppState
    }
    return combinedReducer(state, action)
}

export default rootReducer
