import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import * as Icons from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { FC, useState } from 'react'
import { connect } from 'react-redux'

const { Header, Content, Footer, Sider } = Layout

const App: FC<any> = ({ ManageItemState }) => {
    const navigate = useNavigate()
    const location = useLocation()
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
                    > {collapsed ? <Icons.DoubleLeftOutlined /> : '管理系统平台'}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[location.pathname]}
                        onSelect={({ key }) => {
                            navigate(key)
                        }}
                        items={[...ManageItemState].map(v => ({ ...v, icon: React.createElement(Icons[v.icon as keyof typeof Icons] as any) }))}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: '0 20px' }}>
                        {React.createElement(collapsed ? Icons.MenuUnfoldOutlined : Icons.MenuFoldOutlined, {
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

export default connect((state: any) => ({
    ManageItemState: state.ManageItemReducer
}), {})(App)
