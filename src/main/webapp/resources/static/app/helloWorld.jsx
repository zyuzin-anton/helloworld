import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { helloWorldMessageRequested } from './actions'

class HelloWorld extends React.Component {

    componentDidMount() {
        this.props.helloWorldMessageRequested();
    }

    render() {
        const { loading, message, error } = this.props;
        if (loading) {
            return (<div>Loading</div>)
        }
        if (error != null) {
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
  error : PropTypes.string,
  helloWorldMessageRequested: PropTypes.func
};

export default connect(
    (state) => ({
        loading: state.processHelloWorldMessage.loading,
        message: state.processHelloWorldMessage.message,
        error: state.processHelloWorldMessage.error
    }),
    (dispatch) => ({
        helloWorldMessageRequested: bindActionCreators(helloWorldMessageRequested, dispatch)
    })
)(HelloWorld)
