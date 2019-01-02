import axios from '@/libs/api.request'

export const getArtical = ({ classification }) => {
    const data = { classification }
    return axios.request({
        url: 'articalGet?t=' + Date.now(),
        data,
        method: 'post'
    })
}

export const getArticalContent = ({ _id }) => {
    const data = { _id }
    return axios.request({
        url: 'getArticalContent?t=' + Date.now(),
        data,
        method: 'post'
    })
}

export const githubLogin = ({ code }) => {
    const data = { code }
    return axios.request({
        url: 'githubLogin',
        data,
        method: 'post'
    })
}