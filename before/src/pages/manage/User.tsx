import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const User:FC = () => {
    const navigate = useNavigate()
    return (
        <>
            个人数据页
            <button onClick={() => navigate('/main/list')}>点击去list</button>
        </>
    )
}

export default User
