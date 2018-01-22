import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {loadHelloWoldMessage} from "./actions";

class HelloWorld extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(loadHelloWoldMessage());
    }

    render() {
        const { loading, message, errors } = this.props;
        if (loading) {
            return (<div>Loading</div>);
        }
        if (errors != null) {
            return (<div>Error!</div>);
        }

       return (
            <div>
                <h3>{message}</h3>
            </div>
        );
    }
}

HelloWorld.propTypes = {
  loading: PropTypes.bool,
  message : PropTypes.string,
  errors : PropTypes.array,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    loading: state.processHelloWorldMessage.loading,
    message: state.processHelloWorldMessage.message,
    errors: state.processHelloWorldMessage.errors,
  };
}

export default connect(mapStateToProps)(HelloWorld);
