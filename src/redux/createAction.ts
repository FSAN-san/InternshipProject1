import { SETMENUITEM, SETUSER, SETMANAGEITEM } from './constantType'
import { Action } from 'redux'

type TCreateActionFn = (data: any) => Action

export const setMenuItem: TCreateActionFn = data => ({ type: SETMENUITEM, data })
export const setUser: TCreateActionFn = data => ({ type: SETUSER, data })
export const setManageItem: TCreateActionFn = data => ({ type: SETMANAGEITEM, data })
