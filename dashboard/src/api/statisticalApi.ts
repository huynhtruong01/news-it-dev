import AxiosClient from '.'

const BASE_URL = '/statistical'

export const statisticalNumsApi = () => {
    return AxiosClient.get(`${BASE_URL}/nums`).then((res) => res.data)
}
