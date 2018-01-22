import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: ""};
    }

    componentDidMount() {
        axios.get('/rest/hello/world?id=1')
            .then(res => {
                this.setState({ message:  res.data});
        });
    }

    render() {
       return (
            <div>
                <h2>{this.state.message}</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('react')
);