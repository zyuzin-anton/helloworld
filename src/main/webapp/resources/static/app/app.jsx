import React from "react";
import ReactDOM from "react-dom";
import { Provider} from 'react-redux';

import configureStore from './configureStore';
import HelloWorld from './helloWorld'

class App extends React.Component {

    render() {
        return (
          <Provider store={configureStore}>
            <HelloWorld />
          </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);