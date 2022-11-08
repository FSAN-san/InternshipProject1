import { publicApi } from '../../filter'

interface IArticleAPI {
    current: number,
    title: string,
    tags?: string,
    leftPrice: number,
    rightPrice: number,
    authorId: number,
    dateDesc: boolean
}

const articleAPI = (params: IArticleAPI) => publicApi({
    url: '/briefly/data',
    method: 'get',
    params
})

interface IAuthorAPI {
    tag: string
}

const authorAPI = (params: IAuthorAPI) => publicApi({
    url: '/author/category',
    method: 'get',
    params
})
// 获取分类
const getTagAPI = () => publicApi({
    url: '/category/data',
    method: 'get'
})

export {
    articleAPI,
    authorAPI,
    getTagAPI
}
