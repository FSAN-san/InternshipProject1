import { combineReducers, configureStore } from '@reduxjs/toolkit'
import MenuItemReducer from './reducer/MenuItemReducer'

const store = configureStore({
    reducer: combineReducers({
        MenuItemReducer
    })
})

export default store
