import { Row, Col } from 'antd'
import c from '../../scss/page/public/Home.module.scss'

const Home = () => {
    const data = [
        {
            title: '配音'
        },
        {
            title: 'PPT制作'
        },
        {
            title: '视频加工'
        },
        {
            title: '歌曲制作'
        },
        {
            title: '项目合作'
        }
    ]
    return (
        <div className={c['column-box']}>
            <Row gutter={[100, 40]}>
                {
                    data.map(v => (
                        <Col key={v.title} xs={24} sm={12} xl={8}>
                            <div className={c.column}>
                                <h2 className={c.title}>{v.title}</h2>
                                <div className={c.content}>
                                    {
                                        [...new Array(10).keys()].map(j => (
                                            <p key={new Date().getDate() + j}>
                                                这是{v.title}这是{v.title}这是{v.title}这是{v.title}这是{v.title}这是{v.title}这是{v.title}
                                            </p>
                                        ))
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

export default Home
