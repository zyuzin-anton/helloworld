import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './components/app'
import store from './redux/store'

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path='/' component={App} />
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('react')
);