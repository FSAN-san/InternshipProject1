import { Button, Tag, Row, Col, Descriptions } from 'antd'
import { connect } from 'react-redux'
import { FC } from 'react'

const About: FC<any> = ({ UserState }) => {
    const { username, role, phone, id } = UserState
    return (
        <>
            <Row>
                <Col xxl={8}>
                    <Descriptions title="用户信息" style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
                        <Descriptions.Item label="手机号">{phone}</Descriptions.Item>
                        <Descriptions.Item label="用户名">{username}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xxl={14} xl={24}>
                    <div style={{
                        padding: '20px',
                        boxSizing: 'content-box',
                        border: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    >
                        <p>用户名：</p>
                        <p>{username}</p>
                        <Button type={'primary'} style={{ width: '110px' }} onClick={() => console.log(id)}>修改用户名</Button>
                    </div>
                    <div style={{
                        padding: '20px',
                        boxSizing: 'content-box',
                        border: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    >
                        <p>手机号：</p>
                        <p>+86 {phone}</p>
                        <p style={{ width: '110px' }} />
                    </div>
                    <div style={{
                        padding: '20px',
                        boxSizing: 'content-box',
                        border: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    >
                        <p>当前身份：</p>
                        <Tag color="success">{role === 'USER' ? '用户' : '管理员'}</Tag>
                        <p style={{ width: '110px' }} />
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default connect((state: any) => ({
    UserState: state.UserItemReducer
}), {})(About)
