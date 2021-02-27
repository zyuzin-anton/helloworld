import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withRouter } from 'react-router'

import HelloWorld from '../hello-world'
import HelloWorldGql from '../hello-world-gql'

class App extends React.Component {

    render() {
        return (
            <Grid container spacing={3} justify={'center'}>
              <Grid item xs={2}>
                <Paper>
                  <div onClick={() => window.open(window.location.href + "swagger-ui.html")}>
                      <p>REST</p>
                      <HelloWorld />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <div onClick={() => window.open(window.location.href + "graphiql")}>
                      <p>GraphQL</p>
                      <HelloWorldGql />
                  </div>
                </Paper>
              </Grid>
            </Grid>
        )
    }
}

export default withRouter(App)