import { SETUSER, REMOVEUSER } from '../constantType'

interface IHandler {
    [k: string]: (state: any) => (data: any) => object
}

const handler: IHandler = {
    [SETUSER]: state => data => {
        return { ...state, ...data }
    },
    [REMOVEUSER]: state => data => {
        return {}
    }
}
export default (state: object = {}, action: any) => {
    return handler[action.type as keyof typeof handler]
        ? handler[action.type as keyof typeof handler](state)(action.data)
        : state
}
