import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

import App from './components/app'
import Login from './components/login'
import HelloWorld from './components/hello-world'
import store from './redux/store'
import appRoutes from './utils/app-routes'
import {isAuthenticated} from "./utils";
import {Todo} from "./components/todo";

function checkAuthenticated(nextState, replace, callback) {
    if (!isAuthenticated()) replace(appRoutes.LOGIN);
    callback();
}

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.routing.toJS();
    }
});

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path={appRoutes.ROOT} component={App} onEnter={checkAuthenticated} >
                        <IndexRoute component={HelloWorld} onEnter={checkAuthenticated}/>
                        <Route path={appRoutes.TODO} component={Todo} onEnter={checkAuthenticated}/>
                    </Route>
                    <Route path={appRoutes.LOGIN} component={Login} />
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('react')
);