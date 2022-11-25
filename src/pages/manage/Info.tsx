import { FC, useEffect, useState } from 'react'
import '../../scss/page/manage/Info.scss'
import { Form, Input, Button, FormInstance, message } from 'antd'
import { ContactsOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { GetCaptcha, LoginAPI, RegisterAPI } from '../../axios/api/admin/user'
import { useNavigate } from 'react-router-dom'

const Info: FC = () => {
    const navigate = useNavigate()
    const { Search } = Input
    const [formBoxHeight, setFormBoxHeight] = useState(0)
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
            { required: true, message: '密码不可为空!' },
            () => ({
                validator (_: any, value: string) {
                    if (!value) return Promise.resolve()
                    if (!/^.{8,16}$/.test(value)) return Promise.reject(new Error('密码由八到十六位组成！'))
                    if (!/^[a-zA-Z0-9]{8,16}$/.test(value)) return Promise.reject(new Error('密码由大小写字母和数字组成！'))
                    return Promise.resolve()
                }
            })
        ],
        againPwd: [
            { required: true, message: '请再次输入密码!' },
            ({ getFieldValue }: any) => ({
                validator (_: any, value: string) {
                    if (!value) return Promise.resolve()
                    if (value !== getFieldValue('password')) return Promise.reject(new Error('两次输入的密码不一致！'))
                    return Promise.resolve()
                }
            })
        ],
        captcha: [
            {
                required: true,
                message: '验证码不可为空！'
            },
            {
                min: 6,
                max: 6,
                message: '请输入正确的验证码！'
            }
        ]
    }
    const [formState, setFormState] = useState<'login' | 'register'>('login')
    // 表单对象
    const [loginForm] = Form.useForm()
    const [registerForm] = Form.useForm()
    // 获取验证码
    const toPhone = (form: FormInstance) => {
        form.validateFields(['phone']).then(valid => {
            if (!valid) return
            GetCaptcha(form.getFieldValue('phone')).then((res: any) => message.success(res))
        })
    }
    // 登录事件
    const toLogin = (value: any) => {
        const { phone, password, captcha } = value
        LoginAPI({ phone, password, captcha }).then(({ token }: any) => {
            localStorage.setItem('token', token)
            navigate('/manage/logged/in')
            message.success('欢迎来到管理系统')
        })
    }
    const toRegister = ({ password, phone, captcha }: any) => {
        RegisterAPI({ password, phone, captcha }).then(res => {
            message.info('注册申请提交成功，请等待管理员通过!')
        })
    }
    useEffect(() => {
        setFormBoxHeight(530)
    }, [])
    return (
        <>
            {/* 雪花背景 */}
            {
                [...new Array(200).keys()].map(v => <div key={v} className="snow" />)
            }

            <div className="flex">
                <div className="formBox" style={{ height: formBoxHeight + 'px' }}>
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
                                    name="captcha"
                                    rules={rules.captcha}
                                    className="only-input"
                                >
                                    <Search prefix={<ContactsOutlined className="site-form-item-icon" />}
                                        onSearch={() => toPhone(loginForm)}
                                        placeholder="验证码" enterButton="获取验证码"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '密码不可为空!' }]}
                                    className="only-input"
                                >
                                    <Input.Password
                                        placeholder="密码"
                                        maxLength={17}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item className="to-span"><span
                                    onClick={() => {
                                        setFormState('register')
                                        loginForm.resetFields()
                                        setFormBoxHeight(620)
                                    }}
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
                                    name="captcha"
                                    rules={rules.captcha}
                                    className="only-input"
                                >
                                    <Search prefix={<ContactsOutlined className="site-form-item-icon" />}
                                        onSearch={() => toPhone(registerForm)}
                                        placeholder="验证码" enterButton="获取验证码"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={rules.password}
                                    className="only-input"
                                >
                                    <Input.Password
                                        placeholder="密码"
                                        maxLength={17}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="againPwd"
                                    rules={rules.againPwd}
                                    className="only-input"
                                    validateTrigger={'onBlur'}
                                >
                                    <Input.Password
                                        placeholder="再次输入密码"
                                        maxLength={17}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>

                                <Form.Item className="to-span">
                                    <span onClick={() => {
                                        setFormState('login')
                                        registerForm.resetFields()
                                        setFormBoxHeight(530)
                                    }}
                                    >已有账号，立即登录</span>
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
