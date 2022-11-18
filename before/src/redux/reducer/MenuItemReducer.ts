import { SETMENUITEM } from '../constantType'

interface IHandler {
    [k: string]: (state: any) => (data: any) => object
}

const handler: IHandler = {
    [SETMENUITEM]: state => data => {
        return { ...state, ...data }
    }
}
export default (state: object = {}, action: any) => {
    return handler[action.type as keyof typeof handler]
        ? handler[action.type as keyof typeof handler](state)(action.data)
        : state
}
