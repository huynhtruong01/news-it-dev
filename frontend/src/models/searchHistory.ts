import { IUser } from '.'

export interface ISearchHistoryData {
    userId: number | null
    user?: IUser
    searchQuery: string
}

export interface ISearchHistory extends ISearchHistoryData {
    id: number
}
