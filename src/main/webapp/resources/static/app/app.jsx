import React from "react";
import ReactDOM from "react-dom";
import { Provider} from 'react-redux';

import configureStore from './configureStore';
import Gantt from './component/gantt';
import './App.css';

const store = configureStore();

class App extends React.Component {

    render() {
        return (
            <div>
                <Gantt />
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react')
);