import c from '../../scss/page/public/Dub.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Row, Col, Button } from 'antd'

const Dub = () => {
    return (
        <>
            <Row>
                <Col xs={0} sm={24}>
                    <Row className={c.classification}>
                        <Col className={c['classification-header']}>
                            {
                                [...new Array(5).keys()].map(v => (
                                    <div key={v}>分类{v + 1}：</div>
                                ))
                            }
                        </Col>
                        <Col className={c['classification-content']}>
                            {
                                [...new Array(5).keys()].map(v => (
                                    <div key={v + 5}>
                                        {
                                            [...new Array(v + 2).keys()].map(j => (
                                                <span key={j + 10}>类别{v + 1}</span>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </Col>
                    </Row>
                </Col>
                <Col sm={0}>
                    <Button>展开分类</Button>
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

export default Dub
