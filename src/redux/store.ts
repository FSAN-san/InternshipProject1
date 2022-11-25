import { combineReducers, configureStore } from '@reduxjs/toolkit'
import MenuItemReducer from './reducer/MenuItemReducer'
import UserItemReducer from './reducer/UserItemReducer'
import ManageItemReducer from './reducer/ManageItemReducer'

const store = configureStore({
    reducer: combineReducers({
        MenuItemReducer,
        UserItemReducer,
        ManageItemReducer
    })
})

export default store
