import { AnyAction, combineReducers, Reducer } from 'redux'
import userSlice from '@/store/user'
import hashTagSlice from '@/store/hashTag'
import { AppState } from '.'

export const DESTROY_ACTION = 'DESTROY_STORE'

export const combinedReducer = combineReducers({
    user: userSlice,
    hashTag: hashTagSlice,
})

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
    if (action.type === DESTROY_ACTION) {
        state = {} as AppState
    }
    return combinedReducer(state, action)
}

export default rootReducer