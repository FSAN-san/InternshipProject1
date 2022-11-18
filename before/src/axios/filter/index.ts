import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { message } from 'antd'

const adminApi = axios.create({
    baseURL: '/api/admin'
})
const publicApi = axios.create({
    baseURL: '/api/articles'
})

// 不需要token的请求地址
const notToken = ['/']

const beforeFilter = (config: AxiosRequestConfig) => {
    if (config.url && !notToken.includes(config.url)) {
        (<AxiosRequestHeaders>config.headers).token = 'this is token'
    }
    return config
}

const afterFilter = ({ status, data, statusText }: AxiosResponse) => {
    if (status !== 200) {
        message.error(statusText || '系统异常！')
        return Promise.reject(statusText)
    } else if (data.code !== 200) {
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

initApi(adminApi, publicApi)

export {
    adminApi,
    publicApi
}
