import { adminApi } from '../filter'

const sendPhone = (phone: number) => adminApi({
    url: '/login/captcha',
    method: 'get',
    params: {
        phone
    }
})

const login = (phone: string, password: string, captcha: string) => adminApi({
    url: '/login',
    method: 'post',
    data: {
        phone,
        password,
        captcha
    }
})
const register = (phone: string, password: string, captcha: string) => adminApi({
    url: '/register',
    method: 'post',
    data: {
        phone,
        password,
        captcha
    }
})

export {
    login,
    sendPhone,
    register
}
