import axios from '@/libs/api.request'

export const getArtical = ({ classification }) => {
    const data = { classification }
    return axios.request({
        url: 'articalGet?t=' + Date.now(),
        data,
        method: 'post'
    })
}