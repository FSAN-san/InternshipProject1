import { Outlet } from 'react-router-dom'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DoubleLeftOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'

const { Header, Content, Footer, Sider } = Layout

interface IMenu {
    icon: string,
    text: string,
    path: string
}

const menu: any = [
    {
        icon: UserOutlined,
        label: '管理系统首页',
        path: '/main/home'
    },
    {
        icon: VideoCameraOutlined,
        label: '用户管理',
        path: '/main/user'
    },
    {
        icon: UploadOutlined,
        label: '材料审核',
        path: '/main/audit'
    }
]

const App = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div style={{
                        height: '100px',
                        color: '#eee',
                        lineHeight: '100px',
                        fontSize: '18px',
                        textAlign: 'center',
                        overflow: 'hidden',
                        padding: '0 20px'
                    }}
                    > {collapsed ? <DoubleLeftOutlined /> : '管理系统平台'}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={menu.map((v: IMenu) => ({
                            ...v,
                            key: v.path,
                            icon: React.createElement(v.icon)
                        }))}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: '0 20px' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => {
                                setCollapsed(!collapsed)
                            }
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center', backgroundColor: '#ccc' }}>底部固定</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default App
