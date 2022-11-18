import { Row, Col } from 'antd'
import c from '../../scss/page/public/Home.module.scss'
import { FC } from 'react'
import { connect } from 'react-redux'

const Home: FC<any> = (prop) => {
    const { MenuItemState: { articlesTitle } } = prop
    return (
        <div className={c['column-box']}>
            <Row gutter={[100, 40]}>
                {
                    articlesTitle && [...articlesTitle].map((v: any) => (
                        <Col key={v.title} xs={24} sm={12} xl={8}>
                            <div className={c.column}>
                                <h2 className={c.title}>{v.title}</h2>
                                <div className={c.content}>
                                    {
                                        v.content.length !== 0
                                            ? v.content.map((j: any) => (
                                                <div key={j.title}>
                                                    <p>
                                                        {j.title}
                                                    </p>
                                                    <span>{j.time}</span>
                                                </div>
                                            ))
                                            : <h4>暂无资料</h4>
                                    }
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}
export default connect((state: any) => ({
    MenuItemState: state.MenuItemReducer
}), {})(Home)
