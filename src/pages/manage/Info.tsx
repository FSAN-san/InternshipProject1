import { FC, useState } from 'react'
import '../../scss/page/manage/Info.scss'
import { Form, Input, Button } from 'antd'
import { ContactsOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { sendPhone } from '../../axios/api/admin/user'

const Info: FC = () => {
    const { Search } = Input
    const rules: {
        [k: string]: any
    } = {
        phone: [
            { required: true, message: '手机号不可为空!' },
            () => ({
                validator (_: any, value: string) {
                    if (!value) return Promise.resolve()
                    if (!/^[1][3-9][0-9]{9}$/.test(value)) return Promise.reject(new Error('请输入正确的手机号！'))
                    return Promise.resolve()
                }
            })
        ],
        password: [
            { required: true, message: '密码不可为空!' }
        ]
    }
    const [formState, setFormState] = useState<'login' | 'register'>('login')
    // 表单对象
    const [loginForm] = Form.useForm()
    const [registerForm] = Form.useForm()
    // 获取验证码
    const toPhone = () => {
        sendPhone(loginForm.getFieldValue('phone')).then(res => {
            console.log(res)
        })
    }
    // 登录事件
    const toLogin = (value: any) => {
        const { phone, password, captcha } = value
        console.log(phone, password, captcha)
        // login(phone, password, captcha).then(res => {
        //     console.log(res)
        // })
    }
    const toRegister = (value: any) => {
        console.log(value)
    }
    return (
        <>
            {/* 雪花背景 */}
            {
                [...new Array(200).keys()].map(v => <div key={v} className="snow" />)
            }

            <div className="flex">
                <div className="formBox">
                    <h1 className="title">后台管理</h1>
                    {/* 表单 */}
                    <div className="preserve-box"
                        style={{ transform: formState === 'register' ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                        {/* 登录表单 */}
                        <div className="login-box" style={{ pointerEvents: formState === 'register' ? 'none' : 'auto' }}>
                            <Form
                                onFinish={toLogin}
                                autoComplete="off"
                                size="large"
                                style={{ width: '320px', margin: '0 auto' }}
                                form={loginForm}
                            >
                                <Form.Item
                                    name="phone"
                                    rules={rules.phone}
                                    className="only-input"
                                >
                                    <Input
                                        placeholder="手机号"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '密码不可为空!' }]}
                                    className="only-input"
                                >
                                    <Input.Password
                                        placeholder="密码"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="captcha"
                                    rules={[{ required: true, message: '验证码不可为空!' }]}
                                    className="only-input"
                                >
                                    <Search prefix={<ContactsOutlined className="site-form-item-icon" />}
                                        onSearch={toPhone}
                                        placeholder="验证码" enterButton="获取验证码"
                                    />
                                </Form.Item>
                                <Form.Item className="to-span"><span
                                    onClick={() => setFormState('register')}
                                >没有账号？前往申请</span></Form.Item>
                                <Form.Item style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <Button type="primary" block htmlType="submit"
                                        style={{ width: '200px', height: '50px' }}
                                    >
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        {/* 注册表单 */}
                        <div className="register-box">
                            <Form
                                onFinish={toRegister}
                                autoComplete="off"
                                size="large"
                                style={{ width: '320px', margin: '0 auto' }}
                                form={registerForm}
                            >
                                <Form.Item
                                    name="phone"
                                    rules={rules.phone}
                                    className="only-input"
                                >
                                    <Input
                                        placeholder="手机号"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '密码不可为空!' }]}
                                    className="only-input"
                                >
                                    <Input.Password
                                        placeholder="密码"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="againPwd"
                                    rules={[
                                        { required: true, message: '请再次输入密码!' }
                                    ]}
                                    className="only-input"
                                >
                                    <Input.Password
                                        placeholder="重复密码"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="captcha"
                                    rules={[{ required: true, message: '验证码不可为空!' }]}
                                    className="only-input"
                                >
                                    <Search prefix={<ContactsOutlined className="site-form-item-icon" />}
                                        onSearch={toPhone}
                                        placeholder="验证码" enterButton="获取验证码"
                                    />
                                </Form.Item>

                                <Form.Item className="to-span">
                                    <span onClick={() => setFormState('login')}>已有账号，立即登录</span>
                                </Form.Item>
                                <Form.Item style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <Button type="primary" block htmlType="submit"
                                        style={{ width: '200px', height: '50px' }}
                                    >
                                        申请注册
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default Info
