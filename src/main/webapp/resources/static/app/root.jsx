import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from 'react-router';

import App from "./app";
import configureStore from "./configureStore";

class Root extends React.Component {
    render() {
        return (
            <Provider store={configureStore}>
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