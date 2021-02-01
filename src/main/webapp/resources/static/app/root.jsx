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
                    <Route exact path='/swagger-ui.html' component={() => {
                        window.location.href += '';
                    }} />
                    <Route exact path='/graphiql' component={() => {
                        window.location.href += '';
                    }} />
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('react')
);