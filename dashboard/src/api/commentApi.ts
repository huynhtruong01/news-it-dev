import AxiosClient from '.'
import { IFilters } from '../models'

const BASE_URL = '/comments'

export const getCommentDashboard = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, {
        params,
    }).then((res) => res.data)
}
