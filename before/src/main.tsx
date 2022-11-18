import { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './scss/base.scss'
import Routes from './routes'
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    // 不使用严格模式，会导致开发时useEffect类hook异常执行
    <Provider store={store}>
        <Fragment>
            <HashRouter>
                <Routes />
            </HashRouter>
        </Fragment>
    </Provider>
)
