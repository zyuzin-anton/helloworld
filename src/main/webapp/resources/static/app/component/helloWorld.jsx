import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {loadHelloWoldMessage} from "../action/actions";

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
  const { loading, message, errors } = state.processHelloWorldMessage;
  return {
    loading,
    message,
    errors
  };
}

export default connect(mapStateToProps)(HelloWorld);
