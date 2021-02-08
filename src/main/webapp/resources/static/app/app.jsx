import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router';

import HelloWorld from './helloWorld'
import HelloWorldGql from "./helloWorldGql";

class App extends React.Component {

    render() {
        return (
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Paper>
                  <p onClick={() => window.open(window.location.href + "/swagger-ui.html")}>REST</p>
                  <HelloWorld />
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <p onClick={() => window.open(window.location.href + "/graphiql")}>GraphQL</p>
                  <HelloWorldGql />
                </Paper>
              </Grid>
            </Grid>
        )
    }
}

export default withRouter(App);