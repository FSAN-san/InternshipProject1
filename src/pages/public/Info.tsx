import { Carousel, Menu, Pagination, Tag, Input, message, Button, Select, Drawer, Slider } from 'antd'
import React, { FC, CSSProperties, useState, useEffect } from 'react'
import type { MenuProps } from 'antd'
import { articleAPI, authorAPI, getTagAPI } from '../../axios/api/public/main'
import * as antdIcon from '@ant-design/icons'
import c from '../../scss/page/public/Info.module.scss'

const cssProperties: { [k: string]: CSSProperties } = {
    contentStyle: {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79'
    },
    userStyle: {
        width: 350,
        marginTop: 16,
        marginBottom: 100
    }
}
const {
    contentStyle,
    userStyle
} = cssProperties

interface IHourData {
    key: string,
    img: string,
    text: string
}

interface IArticle {
    // 对应id
    key: number,
    // 封面图片地址
    img: string,
    // 标题（第一行文字，不要超过30个字）
    title: string,
    // 标签，如 ['视频加工', '配音'],
    tags: string[],
    // 发布日期，'YYYY-MM-DD HH:mm:ss'
    date: string,
    // 权重，用于置顶
    major: number,
    // 价格
    price: number,
    // 作者
    author: string,
    // 简单介绍
    subTitle: string
}

function dateFormat (v: any) {
    // 格式化日期并补全位数
    const date = new Date(v)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hour = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minutes}`
}

const Info: FC = () => {
    const [leftPrice, setLeftPrice] = useState<number>(0)
    const [rightPrice, setRightPrice] = useState<number>(1000)
    // 当前作者id
    const [currentAuthor, setCurrentAuthor] = useState<number>(0)
    // 当前选择类别
    const [currentMenu, setCurrentMenu] = useState('全部')
    // 选择日期排序
    const [currentDate, setCurrentDate] = useState('desc')
    // 当前页数
    const [pageCurrent, setPageCurrent] = useState<number>(1)
    // 当前数据条数
    const [pageTotal, setPageTotal] = useState<number>(1)
    // 当前分类item
    const [items, setItems] = useState<MenuProps['items']>()
    // 筛选中作者数据
    const [authorData, setAuthorData] = useState<{
        label: string,
        value: number,
    }[]>()
    // 抽屉状态
    const [open, setOpen] = useState(false)
    // 文章数据
    const [articleData, setArticleData] = useState<IArticle[] | undefined>()
    // 旁边的列表数据
    const [hourData] = useState<IHourData[]>([
        {
            key: '1',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '恒大遭盛京银行追债325亿，所质押广汇集团近31%股份质押广汇集团近31%股份'
        },
        {
            key: '2',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '赫尔松决战在园，俄方又给乌克兰一记“下马威”，或。'
        },
        {
            key: '3',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '假济西又大清北细书赚光：侧在山泊中高速3分钟'
        },
        {
            key: '4',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '为十这液一江欢情得惊镜吗？重里尚负荷二数缩雁为.'
        },
        {
            key: '5',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '花3200亿当上维特CEO后，马斯克斯上了微信？'
        },
        {
            key: '6',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '国家市场监售总局批准中国联通与腾讯设立混改新公司'
        },
        {
            key: '7',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '国家市场监售总局批准中国联通与腾讯设立混改新公司'
        },
        {
            key: '8',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '国家市场监售总局批准中国联通与腾讯设立混改新公司'
        },
        {
            key: '9',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '国家市场监售总局批准中国联通与腾讯设立混改新公司'
        },
        {
            key: '10',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '国家市场监售总局批准中国联通与腾讯设立混改新公司'
        },
        {
            key: '11',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '国家市场监售总局批准中国联通与腾讯设立混改新公司'
        },
        {
            key: '12',
            img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            text: '国家市场监售总局批准中国联通与腾讯设立混改新公司'
        }
    ])
    // 走马灯变化
    const onChange = (currentSlide: number) => {
    }
    // 点击menu类别
    const menuClick: MenuProps['onClick'] = e => {
        setCurrentMenu(e.key)
    }
    // 确认筛选
    const sureFilter = () => {
        // 请求数据
        getArticleData()
        // 关闭抽屉
        setOpen(false)
    }
    // 重置筛选条件
    const resetFilter = () => {
        setCurrentDate('desc')
        setCurrentAuthor(0)
        setLeftPrice(0)
        setRightPrice(1000)
    }
    // 获取文章数据
    const getArticleData = (nowCurrent?: number) => {
        console.log('当前分类：', currentMenu)
        console.log('当前日期排序：', currentDate)
        console.log('当前价格区间：', [leftPrice, rightPrice])
        console.log('当前作者id：', currentAuthor)
        console.log('当前页数：', nowCurrent || pageCurrent)
        articleAPI({
            ...{
                current: nowCurrent || pageCurrent,
                title: '',
                leftPrice,
                rightPrice,
                authorId: currentAuthor,
                dateDesc: currentDate === 'desc'
            },
            ...(currentMenu === '全部' ? {} : { tags: currentMenu })
        }).then(({
            records,
            total,
            current
        }: any) => {
            if (total === 0) {
                message.info('无此类别数据，请查看其他类别！')
                return
            }
            const newRecords = records.map((v: any) => ({
                ...v,
                date: dateFormat(v.date),
                key: v.id
            }))
            setArticleData(newRecords)
            setPageTotal(total)
            setPageCurrent(current)
        })
    }
    useEffect(() => {
        getArticleData()
    }, [currentMenu])
    // 获取分类menu
    useEffect(() => {
        getTagAPI().then((res: any) => {
            setItems([{
                label: '首页',
                key: '全部',
                icon: React.createElement(antdIcon.HomeOutlined)
            }, ...res.map((v: any) => ({
                ...v,
                key: v.label,
                icon: React.createElement((antdIcon as any)[v.icon])
            }))])
        })
    }, [])
    return (
        <div style={{ backgroundColor: '#F9F9F9' }}>
            <div className={c.w} style={{ backgroundColor: '#fff' }}>
                {/* 抽屉 */}
                <Drawer title="关闭筛选" className={c.drawer} placement="right" onClose={() => {
                    setOpen(false)
                }} visible={open}
                >
                    <h2>当前类别：{currentMenu}</h2>
                    <p>价格范围：</p>
                    <div className={c.price}>
                        <p>￥{leftPrice}</p>
                        <Slider
                            style={{ flex: '1' }}
                            min={0}
                            max={1000}
                            range
                            onChange={value => {
                                setLeftPrice(value[0])
                                setRightPrice(value[1])
                            }}
                            value={[leftPrice, rightPrice]}
                        />
                        <p>￥{rightPrice}</p>
                    </div>
                    <div className={c.selectedDate}>
                        日期排序：
                        <Select
                            defaultValue={'desc'}
                            style={{ width: 120 }}
                            value={currentDate}
                            onChange={value => setCurrentDate(value)}
                            options={[
                                {
                                    value: 'desc',
                                    label: '新到旧'
                                },
                                {
                                    value: 'asc',
                                    label: '旧到新'
                                }
                            ]}
                        />
                    </div>
                    <div className={c.selectedAuthor}>
                        选择作者：
                        <Select
                            defaultValue={0}
                            style={{ width: 120 }}
                            value={currentAuthor}
                            onChange={value => setCurrentAuthor(value)}
                            options={authorData}
                        />
                    </div>
                    <Button style={{
                        width: '100%',
                        marginTop: '30px'
                    }} size="large" onClick={resetFilter}
                    >重置筛选条件</Button>
                    <Button style={{
                        width: '100%',
                        marginTop: '30px'
                    }}
                    size="large"
                    onClick={sureFilter}
                    type="primary"
                    >确认筛选</Button>
                </Drawer>

                <Carousel afterChange={onChange} autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <Menu onClick={menuClick} selectedKeys={[currentMenu]} mode="horizontal" items={items} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                >
                    <div className={c.article}>
                        <Button style={{
                            marginTop: '20px',
                            float: 'right'
                        }} onClick={() => {
                            // 获取作者列表
                            authorAPI({
                                tag: currentMenu === '全部' ? '' : currentMenu
                            }).then((res: any) => {
                                setAuthorData([
                                    ...res.map(({
                                        id: value,
                                        username: label
                                    }: any) => ({
                                        value,
                                        label
                                    })),
                                    {
                                        value: 0,
                                        label: '全部'
                                    }
                                ])
                            })
                            setOpen(true)
                        }}
                        >展开筛选</Button>
                        <br style={{ clear: 'both' }} />
                        {
                            articleData && articleData.map(({
                                key,
                                img,
                                title,
                                tags,
                                date,
                                price,
                                author,
                                subTitle
                            }) => (
                                <div key={key} className={c['article-list']}>
                                    <div className={c.img}>
                                        <img src={img} alt="" />
                                        <div className={c.mask}>￥：{price}</div>
                                    </div>
                                    <div className={c['article-content']}>
                                        <div>
                                            {
                                                tags.map(v => (
                                                    <Tag key={v} style={{ marginRight: '5px' }} color="#87d068">{v}</Tag>))
                                            }
                                        </div>
                                        <p>{title}</p>
                                        <p>{subTitle}</p>
                                        <p>发布日期：{date}</p>
                                        <p>作者：{author}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div style={{
                            float: 'right',
                            marginTop: '20px',
                            marginBottom: '200px'
                        }}
                        >
                            <Pagination
                                defaultCurrent={pageCurrent}
                                defaultPageSize={5}
                                current={pageCurrent}
                                total={pageTotal}
                                showTotal={(total) => `文章总数：${total}`}
                                onChange={value => {
                                    getArticleData(value)
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ padding: '0 20px' }}>
                        <div style={userStyle}>
                            <Input placeholder="请输入你需要搜索的型号" />
                        </div>
                        <div className={c.hourFiery}>
                            <hr />
                            <div className={c['hour-content']}>
                                {
                                    hourData.map(({
                                        key,
                                        img,
                                        text
                                    }: IHourData) => (
                                        <div key={key}>
                                            <img className={c['hour-img']} src={img} alt="" />
                                            <div className={c['hour-text']}>
                                                <p>{text}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Info
