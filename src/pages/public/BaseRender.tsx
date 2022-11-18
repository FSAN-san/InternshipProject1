import { Avatar, Button, Col, Row } from 'antd'
import c from '../../scss/page/public/BaseRender.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { FC } from 'react'

const classificationData = [
    {
        title: '分类一',
        children: ['1', '2', '2', '2', '2', '2', '2', '2', '2', '2']
    },
    {
        title: '分类二',
        children: ['1', '2', '2', '2', '2', '2', '2', '2', '2', '2']
    },
    {
        title: '分类三',
        children: ['1', '2', '2', '2', '2', '2', '2', '2', '2', '2']
    },
    {
        title: '分类四',
        children: ['1', '2', '2', '2', '2', '2', '2', '2', '2', '2']
    }
]
interface IProp {
    label: string
}
const BaseRender:FC<IProp> = (prop) => {
    console.log('@', prop)
    return (
        <>
            <Row>
                <Col xs={0} sm={24} className={c.classification}>
                    {
                        classificationData.map(v => (
                            <div key={v.title} className={c['classification-row']}>
                                <div>{v.title + '：'}</div>
                                <div className={c['classification-select']}>
                                    {
                                        v.children.map(j => (<p key={new Date().getDate() + j}>{j}</p>))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </Col>
                <Col sm={0}>
                    <Button style={{ margin: '10px 0' }}>展开分类</Button>
                </Col>
            </Row>
            <div className={c.lists}>
                {
                    [...new Array(6).keys()].map(v => (
                        <div key={v}>
                            <div className={c.list}>
                                <Avatar
                                    size={{
                                        xs: 50,
                                        sm: 60,
                                        md: 70,
                                        lg: 80,
                                        xl: 85,
                                        xxl: 85
                                    }}
                                    icon={<UserOutlined />}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default BaseRender
