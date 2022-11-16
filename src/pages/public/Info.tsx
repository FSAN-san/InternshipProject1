import c from '../../scss/page/public/Info.module.scss'
import { Carousel, Menu } from 'antd'
import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/es/menu/hooks/useItems'

const items: ItemType[] = [
    {
        label: '首页',
        key: '/public/home',
        icon: <MailOutlined />
    },
    {
        label: '配音',
        key: '/public/dub',
        icon: <MailOutlined />,
        children: [
            {
                label: '配音一',
                key: '/public/dub/dub1'
            },
            {
                label: '配音二',
                key: '/public/dub/dub2'
            }
        ]
    },
    {
        label: '视频加工',
        key: '/public/video',
        icon: <MailOutlined />
    },
    {
        label: 'PPT制作',
        key: '/public/ppt',
        icon: <MailOutlined />
    },
    {
        label: '歌曲制作',
        key: '/public/song',
        icon: <MailOutlined />
    },
    {
        label: '项目合作',
        key: '/public/product',
        icon: <MailOutlined />
    }
]

const Info: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

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
                        }}
                        selectedKeys={[location.pathname]}
                        mode="horizontal"
                        items={items}
                    />
                </div>
                <div style={{ padding: '10px' }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Info
