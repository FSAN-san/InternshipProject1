import { UserAPI, BaseAPI } from '../../filter'

// 获取验证码
const GetCaptcha = (phone: number) => UserAPI({
    url: '/login/captcha',
    method: 'get',
    params: {
        phone
    }
})

// 登录
interface ILogin {
    phone: string,
    password: string,
    captcha: string
}

const LoginAPI = (data: ILogin) => UserAPI({
    url: '/login',
    method: 'post',
    data
})

// 注册
interface IRegister extends ILogin {
}

const RegisterAPI = (data: IRegister) => UserAPI({
    url: '/register',
    method: 'post',
    data
})
// 获取用户信息
const GetUserAPI = () => UserAPI({
    url: 'me',
    method: 'get'
})
// 用户角色获取发布作品时的标签
const GetTagsAPI = () => BaseAPI({
    url: '/category/data',
    method: 'get'
})

interface IGetWorkByUser {
    current: number,
    title?: string
}

// 用户角色获取自己的作品列表
const GetWorkByUserAPI = (params: IGetWorkByUser) => UserAPI({
    url: '/articles/get',
    method: 'get',
    params
})

interface IPutWork {
    title: string,
    subTitle: string,
    tags: string[],
    price: number,
    content: string,
    cover: string,
}

// 用户角色上传作品
const PutWorkAPI = (data: IPutWork) => UserAPI({
    url: '/articles/upload/context',
    method: 'post',
    data
})
export {
    LoginAPI,
    GetCaptcha,
    RegisterAPI,
    GetUserAPI,
    GetTagsAPI,
    GetWorkByUserAPI,
    PutWorkAPI
}
