// v6路由（使用hooks）

import { useRoutes, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router/lib/router'

// 懒加载
const Error = lazy(() => import('../pages/Error'))
const App = lazy(() => import('../App'))
const Info = lazy(() => import('../pages/manage/Info'))
const User = lazy(() => import('../pages/manage/User'))
const Audit = lazy(() => import('../pages/manage/Audit'))
const Demo3 = lazy(() => import('../pages/public/Info'))

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to={'/public/info'} />
    },
    {
        path: '/manage',
        children: [
            {
                path: 'info',
                element: <Info />
            },
            {
                path: 'main',
                element: <App />,
                children: [
                    {
                        path: 'audit',
                        element: <Audit />
                    },
                    {
                        path: 'user',
                        element: <User />
                    }
                ]
            }
        ]
    },
    {
        path: '/public',
        children: [
            {
                path: 'info',
                element: <Demo3 />
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
