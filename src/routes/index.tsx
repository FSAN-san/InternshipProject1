// v6路由（使用hooks）
import { useRoutes, Navigate, useLocation } from 'react-router-dom'
import React, { Suspense, lazy, FC, useState, useEffect } from 'react'
import PublicInfo from '../pages/public/Info'
import PublicHome from '../pages/public/Home'
import BaseRender from '../pages/public/BaseRender'
import { connect } from 'react-redux'
import * as Icons from '@ant-design/icons'
import { HomeNavAPI } from '../axios/api/public/main'
import { setMenuItem } from '../redux/createAction'
import Loading from '../components/Loading'

// 懒加载
const Error = lazy(() => import('../pages/Error'))
const App = lazy(() => import('../App'))
// 管理页面路由
const Manage = {
    Info: lazy(() => import('../pages/manage/Info')),
    User: lazy(() => import('../pages/manage/User')),
    Audit: lazy(() => import('../pages/manage/Audit'))
}

// 整理为路由数据
const sortRoute = (items: any) => {
    return items.map((v: any) => {
        const arr = v.key.split('/')
        return v.children
            ? { path: arr[arr.length - 1], children: sortRoute(v.children) }
            : {
                path: arr[arr.length - 1],
                element: <BaseRender label={v.label} />
            }
    })
}

// 整理级联数据
const sortNavItems = (item: any, basePath: string) => {
    if (!item || item.length === 0) return
    return item.map(({ icon, path: key, label, children }: any) => ({
        icon: !Icons[icon as keyof typeof Icons] ? 'CalendarOutlined' : icon,
        key: basePath + '/' + key,
        label,
        children: sortNavItems(children, basePath + '/' + key)
    }))
}
// 整理文章数据
const sortArticles = (obj: any) => {
    const result = []
    for (const objKey in obj) {
        result.push({
            title: objKey,
            content: obj[objKey]
        })
    }
    return result
}

// 路由拦截器
const RouterBefore = ({ children }: any) => {
    return children
}

const baseRouter = [
    {
        path: '/',
        element: <Navigate to={'/public/home'} />
    },
    {
        path: '/manage',
        children: [
            {
                path: 'info',
                element: <Manage.Info />
            },
            {
                path: 'main',
                element: <App />,
                children: [
                    {
                        path: 'audit',
                        element: <Manage.Audit />
                    },
                    {
                        path: 'user',
                        element: <Manage.User />
                    }
                ]
            }
        ]
    },
    {
        path: '/public',
        element: <PublicInfo />,
        children: [
            {
                path: 'home',
                element: <PublicHome />
            }
            // insert
        ]
    },
    {
        path: 'error',
        element: <Error />
    },
    {
        path: '*',
        element: <Navigate to={'error'} />
    }
]

const cachePath = (path: 'public' | 'manage') => {
    localStorage.getItem('path') && localStorage.removeItem('path')
    localStorage.setItem('path', path)
}

const MyRoutes: FC<any> = (props) => {
    const { setMenuItem } = props
    const [routes, setRoutes] = useState(baseRouter)
    const location = useLocation()

    // 放行
    const callbackResult = (
        <RouterBefore>
            <Suspense fallback={<Loading />}>
                {useRoutes(routes)}
            </Suspense>
        </RouterBefore>
    )

    // 在public添加路由，返回添加后的路由对象
    const addRoute = (newRouter: any) => routes.map(v => v.path === '/public'
        ? v.children
            ? {
                ...v,
                children: [...v.children, ...newRouter]
            }
            : { ...v, children: newRouter }
        : { ...v })

    // 获取public路由信息
    const getPublicRouter = () => {
        HomeNavAPI().then((res: any) => {
            const { categories, articlesTitle } = res
            // 加上首页
            const newNavItems = sortNavItems(categories, '/public')
            // 存入redux
            setMenuItem({
                articlesTitle: sortArticles(articlesTitle),
                navItems: newNavItems
            })
            // 添加路由
            setRoutes(addRoute(sortRoute(newNavItems)))
        })
    }

    // 监听路由刷新
    useEffect(() => {
        const path = location.pathname.split('/')[1] as 'public' | 'manage'
        cachePath(path)
        // 判断加载路由
        if (path === 'public') {
            getPublicRouter()
        } else {
            console.log(localStorage.getItem('token'))
        }
    }, [location.pathname])

    return callbackResult
}

export default connect((state: any) => ({
    MenuItemState: state.MenuItemReducer
}), { setMenuItem })(MyRoutes)
