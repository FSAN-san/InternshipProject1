// v6路由（使用hooks）
import { useRoutes, Navigate } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router/lib/router'
import PublicInfo from '../pages/public/Info'
import PublicHome from '../pages/public/Home'
import PublicDub from '../pages/public/Dub'

// 懒加载
const Error = lazy(() => import('../pages/Error'))
const App = lazy(() => import('../App'))
// 管理页面路由
const Manage = {
    Info: lazy(() => import('../pages/manage/Info')),
    User: lazy(() => import('../pages/manage/User')),
    Audit: lazy(() => import('../pages/manage/Audit'))
}

const routes: RouteObject[] = [
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
            },
            {
                path: 'dub',
                children: [
                    {
                        path: 'dub1',
                        element: <PublicDub />
                    },
                    {
                        path: 'dub1',
                        element: <PublicDub />
                    }
                ]
            }
        ]
    },
    {
        path: 'error',
        element: <Error />
    }
]

const MyRoutes = () => {
    return (
        <>
            <Suspense fallback={<h1>Loading ...</h1>}>
                {useRoutes(routes)}
            </Suspense>
        </>
    )
}

export default MyRoutes
