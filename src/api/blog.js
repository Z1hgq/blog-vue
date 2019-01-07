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

export const submitComment = ({ date, ownerId, fromId, fromName, fromAvatar, likeNum, content, reply }) => {
    const data = { date, ownerId, fromId, fromName, fromAvatar, likeNum, content, reply }
    return axios.request({
        url: 'submitComment',
        data,
        method: 'post'
    })
}

export const getComments = ({ ownerId }) => {
    const data = { ownerId }
    return axios.request({
        url: 'getComments',
        data,
        method: 'post'
    })
}

export const submitReply = ({ _id, reply }) => {
    const data = { _id, reply };
    return axios.request({
        url: 'submitReply',
        data,
        method: 'post'
    })
}