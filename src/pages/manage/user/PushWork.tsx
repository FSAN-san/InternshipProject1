import '@wangeditor/editor/dist/css/style.css'
import 'antd/es/modal/style'
import 'antd/es/slider/style'

import c from '../../../scss/page/manage/user/PushWork.module.scss'
import React, { FC, useState, useEffect } from 'react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Row, Col, Button, Form, Input, Upload, message, Select, Slider, InputNumber } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import ImgCrop from 'antd-img-crop'
import { GetTagsAPI, PutWorkAPI } from '../../../axios/api/admin/user'
import { useNavigate } from 'react-router-dom'

const { Option, OptGroup } = Select

interface ITag {
    [k: string]: any,

    label: string,
    children: ITag[],
    key: number
}

type InsertFnType = (url: string, alt?: string, href?: string) => void
// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
        'codeBlock',
        'insertTable',
        'todo',
        'code'
    ]
}

const PushWork: FC = () => {
    const navigate = useNavigate()
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html, setHtml] = useState('')
    // 编辑器中已上传图片
    const [editorUploadImg, setEditorUploadImg] = useState<string[]>([])
    // 标签数据
    const [tags, setTags] = useState<ITag[]>()
    // 当前选中价格
    const [price, setPrice] = useState(0)
    // 封面上传状态
    const [loading, setLoading] = useState(false)
    // 封面图片
    const [imageUrl, setImageUrl] = useState<string>()
    // 已上传的封面
    const [uploadImgs, setUploadImgs] = useState<string[]>([])
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入作品内容...',
        MENU_CONF: {
            uploadImage: {
                server: '/api/user/upload/file',
                headers: {
                    token: localStorage.getItem('token')
                },
                fieldName: 'file',
                // 单个文件上传成功之后
                onSuccess (file: File, res: any) {
                    message.success('图片已上传！')
                },
                customInsert (res: any, insertFn: InsertFnType) {
                    insertFn(res.data.link)
                }
            },
            insertImage: {
                onInsertedImage (imageNode: any) {
                    if (!imageNode) return
                    const { src } = imageNode
                    setEditorUploadImg(imgs => [...imgs, src])
                }
            }
        }
    }

    // 上传中、完成、失败回调函数
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
        const { file: { status } } = info
        if (status === 'uploading') {
            setLoading(true)
            return
        }
        if (status === 'done') {
            const { file: { response: { code, data: { link }, msg } } } = info
            setLoading(false)
            if (code === 200) {
                message.success('封面上传完毕！')
                setImageUrl(link)
                setUploadImgs(imgs => [...imgs, link])
                return
            }
            message.error(msg)
        }
    }
    // 上传前验证
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('只能上传JPG/PNG图片!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('图片大小不可超出2MB!')
        }
        return isJpgOrPng && isLt2M
    }
    // 上传按钮
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    // 裁剪
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj as RcFile)
                reader.onload = () => resolve(reader.result as string)
            })
        }
        const image = new Image()
        image.src = src
        const imgWindow = window.open(src)
        imgWindow?.document.write(image.outerHTML)
    }

    // 将tags数据渲染为标签
    const renderTags = (tags: ITag[]) => {
        return tags.map(v => v.children.length === 0
            ? <Option key={v.key} value={v.label}>{v.label}</Option>
            : <OptGroup key={v.key} label={v.label}>
                {renderTags(v.children)}
            </OptGroup>
        )
    }
    // 服务器删除图片
    const delImgs = (imgs: string[]) => {
        console.log('待删除', imgs)
    }
    // 表单提交
    const finishForm = (form: any) => {
        // 获取目前编辑器中存在的图片
        const saveImgs = editor!.getElemsByType('image').map((v: any) => v.src)
        // 获取已上传但没使用到的图片
        const noUseEditorImgs = editorUploadImg.filter((v: string) => !saveImgs.includes(v))
        // 获取已上传但不使用的封面
        const noUseImgs = uploadImgs.filter((v: string) => v !== imageUrl)
        // 发送服务器删除
        delImgs([...noUseEditorImgs, ...noUseImgs])
        // 提交作品
        const { title, tags, subTitle } = form
        PutWorkAPI({
            title,
            tags,
            subTitle,
            price,
            content: html,
            cover: imageUrl as string
        }).then(res => {
            console.log(res)
        })
        // 清空已上传封面和编辑器图片
        // setUploadImgs([])
        // setEditorUploadImg([])
        // 跳转到个人作品列表
        navigate('../work')
    }

    useEffect(() => {
    // 获取选择的标签
        GetTagsAPI().then((res: any) => {
            setTags(res)
        })
        return () => {
            // 及时销毁 editor ，重要！
            if (!editor) return
            editor.destroy()
            setEditor(null)
            // 从服务器中删除已上传的编辑器图片和封面图片 (行不通)
            // delImgs([...editorUploadImg, ...uploadImgs])
        }
    }, [editor])
    return (
        <>
            <h2>发布作品</h2>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={finishForm}
                autoComplete="off"
                layout={'vertical'}
                style={{
                    margin: '0 20px'
                }}
            >
                <Row className={c['work-box']}>
                    <Col xl={16}>
                        <Form.Item
                            label="作品标题："
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '标题不可为空！'
                                },
                                () => ({
                                    validator (_: any, value: string) {
                                        if (!value) return Promise.resolve()
                                        if (!/^.{2,20}$/.test(value)) return Promise.reject(new Error('标题由二到二十位组成！'))
                                        return Promise.resolve()
                                    }
                                })
                            ]}
                        >
                            <Input style={{ width: '50%' }} />
                        </Form.Item>
                        <Form.Item
                            label={'作品内容：'}
                            name="work"
                            rules={[
                                () => ({
                                    validator (_, value) {
                                        if (!editor?.getText().trim()) return Promise.reject(new Error('内容不可为空！'))
                                        return Promise.resolve()
                                    }
                                })
                            ]}
                        >
                            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                                <Toolbar
                                    editor={editor}
                                    defaultConfig={toolbarConfig}
                                    mode="default"
                                    style={{ borderBottom: '1px solid #ccc' }}
                                />
                                <Editor
                                    defaultConfig={editorConfig}
                                    value={html}
                                    onCreated={setEditor}
                                    onChange={editor => setHtml(editor.getHtml())}
                                    mode="default"
                                    style={{ height: '400px', overflowY: 'hidden' }}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xl={8} style={{ padding: '0 20px' }}>
                        <Form.Item
                            label="副标题："
                            name="subTitle"
                            rules={[
                                {
                                    required: true,
                                    message: '副标题不可为空！'
                                },
                                () => ({
                                    validator (_: any, value: string) {
                                        if (!value) return Promise.resolve()
                                        if (!/^.{10,20}$/.test(value)) return Promise.reject(new Error('副标题由十到二十位组成！'))
                                        return Promise.resolve()
                                    }
                                })
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="价格（￥）："
                            name="price"
                        >
                            <Row>
                                <Col span={16}>
                                    <Slider
                                        min={0}
                                        max={1000}
                                        onChange={e => setPrice(e)}
                                        value={price}
                                    />
                                </Col>
                                <Col span={4}>
                                    <InputNumber
                                        min={0}
                                        max={1000}
                                        style={{ margin: '0 16px' }}
                                        value={price}
                                        onChange={e => setPrice(e)}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item
                            label="标签："
                            name="tags"
                            rules={[
                                {
                                    required: true,
                                    message: '标签不可为空！'
                                }
                            ]}
                        >
                            <Select
                                mode={'multiple'}
                            >
                                {
                                    tags && renderTags(tags)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="封面图片"
                            name="file"
                            valuePropName="fileList"
                            rules={[
                                () => ({
                                    validator (_: any, value: string) {
                                        if (!imageUrl) return Promise.reject(new Error('请选择封面！'))
                                        return Promise.resolve()
                                    }
                                })
                            ]}
                        >
                            <ImgCrop
                                modalOk={'确认裁剪'}
                                modalCancel={'取消'}
                                rotate
                            >
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    maxCount={1}
                                    action="/api/user/upload/file"
                                    beforeUpload={beforeUpload}
                                    onPreview={onPreview}
                                    onChange={handleChange}
                                    headers={{
                                        token: localStorage.getItem('token') || ''
                                    }}
                                >
                                    {imageUrl
                                        ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                        : uploadButton}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                发布作品
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default PushWork
