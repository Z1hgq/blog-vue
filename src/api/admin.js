import axios from '@/libs/api.request'

export const uploadCls = ({ name, avatar, createTime, updateTime }) => {
    const data = {
        name,
        avatar,
        createTime,
        updateTime
    }
    return axios.request({
        url: 'addBlogCla',
        data,
        method: 'post'
    })
}

export const getCls = () => {
    return axios.request({
        url: 'getCls',
        method: 'get'
    })
}