import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHelloWorld } from '../../redux/actions'
import { Query } from '@redux-requests/react'
import Chip from '@material-ui/core/Chip'
import {
    FETCH_HELLO_WORLD
} from '../../redux/action-types'

const RequestError = () => (
    <Chip size="small" label="Error!" />
);

const RequestLoading = () => (
    <Chip size="small" label="Loading" />
);

class HelloWorldGql extends React.Component {

    componentDidMount() {
        this.props.fetchHelloWorld();
    }

    render() {
        return (
            <Query
                type={FETCH_HELLO_WORLD}
                errorComponent={RequestError}
                loadingComponent={RequestLoading}
                noDataMessage={<p>There is no entity currently.</p>}
            >
                {({ data }) => (
                    <Chip size="small" label={data.helloWorld.description} color="secondary" />
                )}
            </Query>
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