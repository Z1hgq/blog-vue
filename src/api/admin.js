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

export const articalUp = ({ title, tag, description, content, createTime, updateTime, classification }) => {
    const data = {
        title,
        tag,
        description,
        content,
        createTime,
        updateTime,
        classification
    }
    return axios.request({
        url: 'articalUp',
        data,
        method: 'post'
    })
}

export const delArtical = ({ _id }) => {
    const data = { _id }
    return axios.request({
        url: 'delArtical',
        data,
        method: 'post'
    })
}