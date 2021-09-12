import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withRouter } from 'react-router'

import HelloWorld from '../hello-world'
import NavBar from "../nav-bar/nav-bar";

class App extends React.Component {

    render() {
        return (
            <div>
                <NavBar/>
                <div>
                    <Grid container spacing={3} justify={'center'}>
                        <Grid item xs={2}>
                            <Paper>
                                <div onClick={() => window.open(window.location.href + "swagger-ui/")}>
                                    <p>REST</p>
                                    <HelloWorld />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withRouter(App)