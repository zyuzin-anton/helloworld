import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import NavBar from "../nav-bar/nav-bar";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {errorMessageClose} from "../../redux/actions";

class App extends React.Component {

    render() {
        const { children, error, errorMessageClose } = this.props;
        return (
            <div>
                <NavBar/>
                <div>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={error}
                        onClose={errorMessageClose}
                        message={error}
                        key={'bottomleft'}
                    />
                    {React.cloneElement(children, this.props)}
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.string,
    errorMessageClose: PropTypes.func
};

export default connect(
    (state) => ({
        error: state.appData.error,
    }),
    (dispatch) => ({
        errorMessageClose: bindActionCreators(errorMessageClose, dispatch),
    })
)(withRouter(App))