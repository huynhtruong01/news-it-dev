import AxiosClient from '.'
import { IUser } from '@/models'

const BASE_URL = '/users'

export const updateUser = (data: IUser) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data).then((res) => res.data)
}
