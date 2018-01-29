import React from "react";
import ReactDOM from "react-dom";
import { Provider} from 'react-redux';

import configureStore from './configureStore';
import HelloWorld from './component/helloWorld'

const store = configureStore();

class App extends React.Component {

    render() {
        return (
          <Provider store={store}>
            <HelloWorld />
          </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);