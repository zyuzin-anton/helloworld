import React from "react";
import LoginForm from "./login-form";
import {withRouter} from "react-router";

class Login extends React.Component {

    render() {
        return (
            <div className="App">
                <LoginForm />
            </div>
        )
    }
}

export default withRouter(Login)