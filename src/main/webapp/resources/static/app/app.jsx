import React from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'

import configureStore from './configureStore'
import HelloWorld from './helloWorld'
import HelloWorldGql from "./helloWorldGql";

class App extends React.Component {

    render() {
        return (
          <Provider store={configureStore}>
            <p>REST</p>
            <HelloWorld />
            <p>GraphQL</p>
            <HelloWorldGql />
          </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);