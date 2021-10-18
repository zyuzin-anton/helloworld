import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'

import { helloWorldMessageRequested } from '../../redux/actions'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";

@connect(
    (state) => ({
        loading: state.processHelloWorldMessage.loading,
        message: state.processHelloWorldMessage.message
    }),
    (dispatch) => ({
        helloWorldMessageRequested: bindActionCreators(helloWorldMessageRequested, dispatch)
    })
)
export default class HelloWorld extends React.Component {

    static propTypes = {
        loading: PropTypes.bool,
        message : PropTypes.string,
        helloWorldMessageRequested: PropTypes.func
    }

    componentDidMount() {
        this.props.helloWorldMessageRequested();
    }

    render() {
        const { loading, message } = this.props;

        return (
            <Grid container spacing={3} justify={'center'}>
                <Grid item xs={2}>
                    <Paper>
                        <div onClick={() => window.open(window.location.href + "swagger-ui/")}>
                            <p>REST</p>
                            {loading ? <Chip size="small" label="Loading" /> : <Chip size="small" label={message} color="primary" />}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
