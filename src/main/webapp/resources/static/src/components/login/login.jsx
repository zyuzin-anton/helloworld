import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loginRequested} from "../../redux/actions";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";

class Login extends React.Component {
    componentDidMount() {
        const { router, loginRequested } = this.props;
        console.log("Router: ", router);
        if (router.location.query.code) {
            loginRequested(router.location.query.code);
        } else  {
            const state = uuidv4();
            const redirectUri = window.location.origin + '/login';
            console.log("Redirect uri: ", redirectUri);
            window.location.assign(process.env.KEYCLOAK_URL + '/auth/realms/hello-world-realm/protocol/openid-connect/auth?response_type=code&client_id=hello-world-client&redirect_uri=' + redirectUri + '&state=' + state + '&login=true&scope=openid');
        }
    }

    render() {
        const {errorMessage} = this.props;
        return (
            <div className="App">
                {errorMessage ? errorMessage : 'Login'}
            </div>
        )
    }
}

Login.propTypes = {
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
)(withRouter(Login))