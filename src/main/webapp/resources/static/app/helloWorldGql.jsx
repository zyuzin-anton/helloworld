import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchHelloWorld} from "./actions";
import { Query } from '@redux-requests/react';
import {
    FETCH_HELLO_WORLD
} from './actions'

const RequestError = () => (
    <p>Error!</p>
);

const RequestLoading = () => (
    <p>Loading</p>
);

class HelloWorldGql extends React.Component {

    componentDidMount() {
        this.props.fetchHelloWorld();
    }

    render() {
        return (
            <div>
                <h4>
                    <Query
                        type={FETCH_HELLO_WORLD}
                        errorComponent={RequestError}
                        loadingComponent={RequestLoading}
                        noDataMessage={<p>There is no entity currently.</p>}
                    >
                        {({ data }) => (
                            data.helloWorld.description
                        )}
                    </Query>
                </h4>
            </div>
        )
    }
}

HelloWorldGql.propTypes = {
    fetchHelloWorld: PropTypes.func
};

export default connect(
    (state) => ({}),
    (dispatch) => ({
        fetchHelloWorld: bindActionCreators(fetchHelloWorld, dispatch)
    })
)(HelloWorldGql)