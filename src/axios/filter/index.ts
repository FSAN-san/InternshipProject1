import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { message } from 'antd'

const AdminAPI = axios.create({
    baseURL: '/api/admin'
})
const UserAPI = axios.create({
    baseURL: '/api/user'
})
const PublicAPI = axios.create({
    baseURL: '/api/articles'
})
const BaseAPI = axios.create({
    baseURL: '/api'
})

const beforeFilter = (config: AxiosRequestConfig) => {
    (<AxiosRequestHeaders>config.headers).token = localStorage.getItem('token') || ''
    return config
}

const afterFilter = ({ status, data, statusText }: AxiosResponse) => {
    if (status !== 200) {
        message.error(statusText || '系统异常！')
        return Promise.reject(statusText)
    } else if (data.code !== 200) {
        if (data.code === 2005) {
            message.info('身份过期，请重新登录！')
            location.replace('/#/manage/info')
            return Promise.reject(data.msg)
        }
        message.error(data.msg || '数据返回失败！')
        return Promise.reject(data.msg)
    }
    return data.data
}

const initApi = (...apis: AxiosInstance[]) => {
    apis.forEach((v: AxiosInstance) => {
        v.interceptors.request.use(beforeFilter)
        v.interceptors.response.use(afterFilter)
    })
}

initApi(AdminAPI, PublicAPI, UserAPI, BaseAPI)

export {
    AdminAPI,
    PublicAPI,
    UserAPI,
    BaseAPI
}
