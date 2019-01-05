import {
    localSave,
    localRead
} from '@/libs/util'
import { setUserInfo, getUserInfo } from '@/libs/util'
export default {
    state: {
        login_url: '',
        userInfo: {}
    },
    mutations: {
        handleGithub(state, userInfo) {
            state.userInfo = userInfo
            setUserInfo(userInfo)
        },
        handleSetUrl(state, login_url) {
            localSave('login_url', login_url)
            state.login_url = login_url
        }
    },
    actions: {
        // getUserInfo(state,commit){
        //     return new Promise((resolve, reject) => {
        //         logout(state.token).then(() => {
        //                 commit('setToken', '')
        //                 commit('setAccess', [])
        //                 resolve()
        //             }).catch(err => {
        //                 reject(err)
        //             })
        //     })
        // }
    },
}