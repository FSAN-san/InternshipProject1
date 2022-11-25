import { GetWorkByUserAPI } from '../../../axios/api/admin/user'
import { useEffect, useState } from 'react'

const WorkList = () => {
    const [workList, setWorkList] = useState([])
    useEffect(() => {
        GetWorkByUserAPI({
            current: 1
        }).then((res: any) => {
            const { records } = res
            setWorkList(records)
        })
    }, [])
    return workList.length !== 0
        ? (
            <>user worklist</>
        )
        : <>暂时没有数据</>
}
export default WorkList
