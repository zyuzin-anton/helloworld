import React from "react"
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {loadHelloWoldMessage} from "./actions"

class HelloWorld extends React.Component {

    componentDidMount() {
        this.props.loadHelloWoldMessage();
    }

    render() {
        const { loading, message, errors } = this.props;
        if (loading) {
            return (<div>Loading</div>)
        }
        if (errors != null) {
            return (<div>Error!</div>)
        }

       return (
            <div>
                <h4>{message}</h4>
            </div>
        )
    }
}

HelloWorld.propTypes = {
  loading: PropTypes.bool,
  message : PropTypes.string,
  errors : PropTypes.array,
  loadHelloWoldMessage: PropTypes.func
};

export default connect(
    (state) => ({
        loading: state.processHelloWorldMessage.loading,
        message: state.processHelloWorldMessage.message,
        errors: state.processHelloWorldMessage.errors
    }),
    (dispatch) => ({
        loadHelloWoldMessage: bindActionCreators(loadHelloWoldMessage, dispatch)
    })
)(HelloWorld);
