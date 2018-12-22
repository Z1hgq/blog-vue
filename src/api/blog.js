import axios from '@/libs/api.request'

export const getArtical = ({ name }) => {
    const data = { name }
    return axios.request({
        url: 'articalGet',
        data,
        method: 'get'
    })
}