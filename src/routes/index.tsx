import { useRoutes, Navigate, useLocation, useNavigate } from 'react-router-dom'
import React, { Suspense, lazy, FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as Icons from '@ant-design/icons'
import { HomeNavAPI } from '../axios/api/public/main'
import { setMenuItem, setUser, setManageItem } from '../redux/createAction'
import Loading from '../components/Loading'
import { GetUserAPI } from '../axios/api/admin/user'
import { message } from 'antd'
import { RouteObject } from 'react-router/lib/router'
// 公开展示路由
import PublicInfo from '../pages/public/Info'
import PublicHome from '../pages/public/Home'
// 公开展示作品
import BaseRender from '../pages/public/BaseRender'
// 管理员路由
import AdminAbout from '../pages/manage/admin/About'
import AdminData from '../pages/manage/admin/Data'
import AdminMenu from '../pages/manage/admin/Menu'
import AdminUser from '../pages/manage/admin/User'
import AdminWork from '../pages/manage/admin/Work'
// 用户路由
import UserAbout from '../pages/manage/user/About'
import UserData from '../pages/manage/user/Data'
import UserPushWork from '../pages/manage/user/PushWork'
import UserWorkList from '../pages/manage/user/WorkList'

// 懒加载
const Error = lazy(() => import('../pages/Error'))
const App = lazy(() => import('../App'))
// 管理页面路由
const Manage = {
    Info: lazy(() => import('../pages/manage/Info'))
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

const baseRouter: RouteObject[] = [
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
                    // insert
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
        path: '/error',
        element: <Error />
    }
]

const cachePath = (path: 'public' | 'manage') => {
    localStorage.getItem('path') && localStorage.removeItem('path')
    localStorage.setItem('path', path)
}

// 管理员路由信息
const adminRouter = {
    path: 'admin',
    element: <App />,
    children: [
        {
            path: 'about',
            element: <AdminAbout />
        },
        {
            path: 'data',
            element: <AdminData />
        },
        {
            path: 'menu',
            element: <AdminMenu />
        },
        {
            path: 'work',
            element: <AdminWork />
        },
        {
            path: 'user',
            element: <AdminUser />
        }
    ]
}

// 管理员menu列表
const adminMenuItem = [
    {
        key: '/manage/admin/data',
        label: '查看数据',
        icon: 'UserOutlined'
    },
    {
        key: '/manage/admin/about',
        label: '个人信息',
        icon: 'UserOutlined'
    },
    {
        key: '/manage/admin/menu',
        label: '菜单管理',
        icon: 'UserOutlined'
    },
    {
        key: '/manage/admin/work',
        label: '作品管理',
        icon: 'UserOutlined'
    },
    {
        key: '/manage/admin/user',
        label: '用户管理',
        icon: 'UserOutlined'
    }
]

// 用户路由
const userRouter = {
    path: 'user',
    element: <App />,
    children: [
        {
            path: 'about',
            element: <UserAbout />
        },
        {
            path: 'data',
            element: <UserData />
        },
        {
            path: 'push',
            element: <UserPushWork />
        },
        {
            path: 'work',
            element: <UserWorkList />
        }
    ]
}

// 用户menu列表
const userMenuItem = [
    {
        key: '/manage/user/data',
        label: '查看数据',
        icon: 'UserOutlined'
    },
    {
        key: '/manage/user/about',
        label: '个人信息',
        icon: 'UserOutlined'
    },
    {
        key: '/manage/user/push',
        label: '编辑作品',
        icon: 'UserOutlined'
    },
    {
        key: '/manage/user/work',
        label: '作品管理',
        icon: 'UserOutlined'
    }
]

// 放行
const callbackResult = (routes: any) => (
    <Suspense fallback={<Loading />}>
        {useRoutes(routes)}
    </Suspense>
)
const MyRoutes: FC<any> = (props) => {
    const { setMenuItem, setManageItem, ManageItemState, setUser, UserState } = props
    const [routes, setRoutes] = useState<RouteObject[]>(baseRouter)
    const location = useLocation()
    const navigate = useNavigate()

    // 在指定path的children下添加路由，返回添加后的路由对象
    const addRoute = (newRouter: any, path: string) => routes.map(v => v.path === path
        ? v.children
            ? {
                ...v,
                children: [...v.children, ...newRouter]
            }
            : { ...v, children: newRouter }
        : { ...v })

    // 获取public路由信息
    const getPublicRouter = () => {
        console.log('获取public路由')
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
            setRoutes(addRoute([...sortRoute(newNavItems), {
                path: '*',
                element: <Navigate to={'/error'} />
            }], '/public'))
        })
    }
    // 获取manage的路由信息
    const getManageRouter = () => {
        const notToken = ['/manage', '/manage/info']
        if (!notToken.includes(location.pathname)) {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/manage/info')
                message.info('请先登录！')
                return
            }
            if (ManageItemState.length === 0 && Object.keys(UserState).length === 0) {
                GetUserAPI().then((res: any) => {
                    console.log(res)
                    setUser(res)
                    const { role }: {role: 'SYSTEM_ADMIN' | 'USER'} = res
                    if (role === 'SYSTEM_ADMIN') {
                        console.log('加载管理员路由完毕', routes, userRouter)
                        setManageItem(adminMenuItem)
                        setRoutes(addRoute([adminRouter], '/manage'))
                        if (location.pathname === '/manage/logged/in') {
                            // 登录后管理员重定向页面
                            navigate('/manage/admin/data')
                        }
                    } else if (role === 'USER') {
                        setManageItem(userMenuItem)
                        setRoutes(addRoute([userRouter], '/manage'))
                        console.log('加载用户路由完毕', routes, userRouter)
                        if (location.pathname === '/manage/logged/in') {
                            // 登录后用户重定向页面
                            navigate('/manage/user/data')
                        }
                    }
                })
            }
        }
    }

    // 监听路由刷新
    useEffect(() => {
        const path = location.pathname.split('/')[1] as 'public' | 'manage'
        cachePath(path)
        // 判断加载路由
        if (path === 'public') {
            if (routes[2].children!.length === 1) {
                getPublicRouter()
            }
        } else if (path === 'manage') {
            // 判断是否存在路由
            // if ((routes[1].children!)[1]!.children!.length === 0) {
            getManageRouter()
            // }
        }
    }, [location.pathname])

    return callbackResult(routes)
}

export default connect((state: any) => ({
    ManageItemState: state.ManageItemReducer,
    UserState: state.UserItemReducer
}), { setMenuItem, setUser, setManageItem })(MyRoutes)
