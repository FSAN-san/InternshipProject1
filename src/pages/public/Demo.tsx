import c from '../../scss/page/public/Demo.module.scss'
import { MailOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Carousel, Menu, Button, Input, Row, Col, Tag } from 'antd'
import React, { FC, useState } from 'react'

// 标签栏数据
const items: MenuProps['items'] = [
    {
        label: '首页',
        key: '首页',
        icon: <MailOutlined />
    },
    {
        label: '配音',
        key: '配音',
        icon: <MailOutlined />
    },
    {
        label: '视频加工',
        key: '视频加工',
        icon: <MailOutlined />
    },
    {
        label: 'PPT制作',
        key: 'PPT制作',
        icon: <MailOutlined />
    },
    {
        label: '歌曲制作',
        key: '歌曲制作',
        icon: <MailOutlined />
    },
    {
        label: '项目合作',
        key: '项目合作',
        icon: <MailOutlined />
    }
]

const Demo: FC = () => {
    const { Search } = Input
    const [tagMenu, setTagMenu] = useState('首页')
    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e)
        setTagMenu(e.key)
    }
    return (
        <>
            <div className={c.container}>
                {/* 轮播图 */}
                <header className={c.carousel}>
                    <Carousel autoplay>
                        {
                            [...new Array(4).keys()].map(v => (
                                <div key={v}>
                                    <h3 className={c['img-box']}>1</h3>
                                </div>
                            ))
                        }
                    </Carousel>
                </header>
                {/* 标签栏 */}
                <div className={c['tag-nav']}>
                    <Menu onClick={onClick} selectedKeys={[tagMenu]} mode="horizontal" items={items} />
                </div>
                {/* 筛选所在栏 */}
                <div className={c.filter}>
                    <Button className={c['filter-button']} onClick={() => {
                    }}
                    >展开筛选</Button>
                    <Search
                        placeholder="请输入要搜索的型号"
                        allowClear
                        className={c['search-input']}
                        enterButton="搜索"
                        onSearch={() => {
                        }}
                    />
                </div>
                <Row className={c.content}>
                    <Col xs={24} lg={16} className={c.left}>
                        <Row gutter={[20, 20]}>
                            {
                                [...new Array(10).keys()].map(v => (
                                    <Col key={v} xs={24} md={12} xl={8} className={c.column}>
                                        <div className={c['img-box']}>
                                            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" />
                                        </div>
                                        <div className={c['text-box']}>
                                            <div>
                                                {
                                                    ['配音', '编程'].map(v => (
                                                        <Tag key={v} style={{ marginRight: '5px' }} color="#87d068">{v}</Tag>))
                                                }
                                            </div>
                                            <h2>标题</h2>
                                            <div className={c.text}>
                                                <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                                            </div>
                                            <div className={c.author}>
                                                作者：FSAN
                                            </div>
                                            <div>
                                                发布日期：2022-10-10 10:30
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                    <Col lg={8} className={c.sidebar}>
                        0
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default Demo
