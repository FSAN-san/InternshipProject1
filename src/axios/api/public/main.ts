import { PublicAPI } from '../../filter'

interface IArticleAPI {
    current: number,
    title: string,
    tags?: string,
    leftPrice: number,
    rightPrice: number,
    authorId: number,
    dateDesc: boolean
}

const articleAPI = (params: IArticleAPI) => PublicAPI({
    url: '/briefly/data',
    method: 'get',
    params
})

interface IAuthorAPI {
    tag: string
}

const authorAPI = (params: IAuthorAPI) => PublicAPI({
    url: '/author/category',
    method: 'get',
    params
})
// 获取分类
const getTagAPI = () => PublicAPI({
    url: '/category/data',
    method: 'get'
})

// 获取首页数据
const HomeNavAPI = () => PublicAPI({
    url: '/category/some/title',
    method: 'get'
})

export {
    articleAPI,
    authorAPI,
    getTagAPI,
    HomeNavAPI
}
