import { Button, Col, Row, Drawer } from 'antd'
import c from '../../scss/page/public/BaseRender.module.scss'
import { FC, useState } from 'react'

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

const BaseRender: FC<IProp> = (prop) => {
    const [open, setOpen] = useState(false)

    const onClose = () => {
        setOpen(false)
    }
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
                    <Button style={{ margin: '10px' }} onClick={() => setOpen(true)}>展开分类</Button>
                </Col>
            </Row>
            <div className={c.lists}>
                <Row>
                    {
                        [...new Array(6).keys()].map(v => (
                            <Col key={v} xs={24} sm={12}>
                                <div className={c.list}>
                                    <div className={c.img}>
                                        <img src="https://joeschmoe.io/api/v1/random" style={{ height: '100%' }} alt="" />
                                        <div className={c.mask}>123</div>
                                    </div>
                                    <div className={c.content}>
                                        <div className={c.title}>
                                            <p>标题标题题标题题题标题题题标题题题标题题题标题题题标题题题标题题题标题题题标题题题标题题题标题题标题</p>
                                        </div>
                                        <div className={c.text}>
                                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                                        </div>
                                        <div className={c.other}>
                                            <div className={c.author}>
                                                <p>作者：小次郎</p>
                                            </div>
                                            <div className={c.date}>2022-10-10</div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </div>
            <Drawer title="请选择" placement="right" onClose={onClose} visible={open}>

            </Drawer>
        </>
    )
}

export default BaseRender
