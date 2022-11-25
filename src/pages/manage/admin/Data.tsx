import { Row, Col } from 'antd'
import c from '../../../scss/page/manage/admin/Data.module.scss'
import initChart1 from '../../../echarts/AddUser'
import initChart2 from '../../../echarts/WorkCount'
import React, { useEffect, useRef } from 'react'

const Data = () => {
    const myChart1 = useRef<any>()
    const myChart2 = useRef<any>()
    // 监听窗口变化
    useEffect(() => {
        const chart1 = initChart1(myChart1.current, ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], [120, 200, 150, 80, 70, 110, 130])
        const chart2 = initChart2(myChart2.current, [
            { value: 40, name: '分类 1' },
            { value: 38, name: '分类 2' },
            { value: 32, name: '分类 3' },
            { value: 30, name: '分类 4' },
            { value: 28, name: '分类 5' },
            { value: 26, name: '分类 6' },
            { value: 22, name: '分类 7' },
            { value: 18, name: '分类 8' }
        ])
        window.addEventListener('resize', () => {
            chart1.resize()
            chart2.resize()
        })
        return () => {
            window.removeEventListener('resize', () => {
                chart1.resize()
                chart2.resize()
            })
        }
    }, [])
    return (
        <>
            <Row style={{ height: '100%' }}>
                <Col xs={12} xxl={10}>
                    <Row>
                        <Col span={12}>
                            <div className={c['user-count']}>
                                <p>用户总数</p>
                                <span>1</span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={c['shop-count']}>
                                <p>商品总数</p>
                                <span>12</span>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <div ref={myChart2} style={{ width: '100%', height: '500px', marginTop: '100px' }} />
                    </div>
                </Col>
                <Col xs={12} xxl={12} style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div ref={myChart1} style={{ width: '100%', height: '700px' }} />
                </Col>
            </Row>
        </>
    )
}

export default Data
