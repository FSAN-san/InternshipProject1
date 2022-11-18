import { adminApi } from '../../filter'

// 获取验证码
const sendPhone = (phone: number) => adminApi({
    url: '/login/captcha',
    method: 'get',
    params: {
        phone
    }
})

// 登录
interface ILogin {
    phone: string, password: string, captcha: string
}
const login = (data: ILogin) => adminApi({
    url: '/login',
    method: 'post',
    data
})

// 注册
interface IRegister extends ILogin{}
const register = (data: IRegister) => adminApi({
    url: '/register',
    method: 'post',
    data
})

export {
    login,
    sendPhone,
    register
}
