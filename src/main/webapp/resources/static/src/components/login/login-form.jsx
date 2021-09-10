import React, { Component } from "react";
import CustomInput from "../../components/custom-input";
import Button from "../../components/button";
import {loginRequested} from "../../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import Alert from '@material-ui/lab/Alert';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        console.log("Set state: ", id, value);
        this.setState({ [id]: value });
    }

    handleSubmit(event) {
        console.log("prevent default event at login form");
        event.preventDefault();
        let { login, password } = this.state;
        console.log( 'Email:', login, 'Password: ', password);
        this.props.loginRequested(login, password)
    }

    render() {
        let { login, password } = this.state;
        const {errorMessage} = this.props;
        console.log("render login form");
        console.log("Error:", errorMessage);
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <div/>}
                <CustomInput
                    labelText="Email"
                    id="login"
                    value={login}
                    formControlProps={{
                        fullWidth: true
                    }}
                    handleChange={this.handleChange}
                    type="text"
                />
                <CustomInput
                    labelText="Password"
                    id="password"
                    value={password}
                    formControlProps={{
                        fullWidth: true
                    }}
                    handleChange={this.handleChange}
                    type="password"
                />

                <Button type="submit" color="primary" className="form__custom-button">
                    Log in
                </Button>
            </form>
        )
    }
}

LoginForm.propTypes = {
    loginRequested: PropTypes.func,
    errorMessage: PropTypes.string
};

export default connect(
    (state) => ({
        errorMessage: state.loginData.errorMessage
    }),
    (dispatch) => ({
        loginRequested: bindActionCreators(loginRequested, dispatch)
    })
)(LoginForm)