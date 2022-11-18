import c from '../../scss/page/public/Info.module.scss'
import { Carousel, Menu } from 'antd'
import React, { FC, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import * as Icons from '@ant-design/icons'
import { connect } from 'react-redux'

const Info: FC<any> = (prop) => {
    const navigate = useNavigate()
    const { MenuItemState: { navItems } } = prop
    const location = useLocation()
    const [currentMenuKey, setCurrentMenuKey] = useState<string>(location.pathname)

    // 将字符串icon渲染为组件
    const renderIcon = (items: any) => {
        if (!items) return
        return items.map((v: any) => ({
            ...v,
            icon: React.createElement(Icons[v.icon as keyof typeof Icons] as any),
            children: renderIcon(v.children)
        }))
    }
    return (
        <>
            <div className={c.container}>
                <header>
                    {/* 轮播图 */}
                    <Carousel afterChange={() => {
                    }}
                    >
                        {
                            [...new Array(4).keys()].map(v => (
                                <div key={v} className={c.carousel}>
                                    <h3>{v + 1}</h3>
                                </div>
                            ))
                        }
                    </Carousel>
                </header>
                <div className={c.nav}>
                    <Menu
                        onClick={({ key }) => {
                            navigate(key)
                            setCurrentMenuKey(key)
                        }}
                        selectedKeys={[currentMenuKey]}
                        mode="horizontal"
                        items={navItems && [{
                            label: '首页',
                            key: '/public/home',
                            icon: <Icons.HomeOutlined />
                        }, ...renderIcon(navItems)]}
                    />
                </div>
                <div style={{ padding: '10px' }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default connect((state: any) => ({
    MenuItemState: state.MenuItemReducer
}), {})(Info)
