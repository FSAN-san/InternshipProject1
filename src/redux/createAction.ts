import { SETMENUITEM } from './constantType'
import { Action } from 'redux'

type TCreateActionFn = (data: any) => Action

export const setMenuItem: TCreateActionFn = data => ({ type: SETMENUITEM, data })
