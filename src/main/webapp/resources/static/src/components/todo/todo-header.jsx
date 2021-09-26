import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export class TodoHeader extends React.Component {
    render() {
        return (
            <Grid container spacing={1} justify={'center'}>
                <Grid item>
                    <Paper>Monday</Paper>
                </Grid>
                <Grid item>
                    <Paper>Tuesday</Paper>
                </Grid>
                <Grid item>
                    <Paper>Wednesday</Paper>
                </Grid>
                <Grid item>
                    <Paper>Thursday</Paper>
                </Grid>
                <Grid item>
                    <Paper>Friday</Paper>
                </Grid>
                <Grid item>
                    <Paper>Saturday</Paper>
                </Grid>
                <Grid item>
                    <Paper>Sunday</Paper>
                </Grid>
            </Grid>
        )
    }
}