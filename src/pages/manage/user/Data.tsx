import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import c from '../../../scss/page/manage/user/Data.module.scss'

const Data = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className={c.header}>
                <p className={c.title}>脚踏实地，笃志前行</p>
                <p className={c['sub-title']}>欢迎来到管理系统</p>
                <Button size={'large'} className={c['to-work']} onClick={() => navigate('../work')} type={'primary'}>查看作品</Button>
            </div>
            <div className={c.count}>
                <table className={c.table}>
                    <th className={c.th}>个人内容统计</th>
                    <tr className={c.tr}>
                        <span style={{ padding: '0 10px', fontWeight: 'bold' }}>10</span>部作品
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Data
