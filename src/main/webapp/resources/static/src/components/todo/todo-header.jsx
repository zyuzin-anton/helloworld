import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import {messages} from "../../utils";

@withStyles((theme) => ({
    root: {
        width: 130
    }
}))
export default class TodoHeader extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={1} justify={'center'}>
                <Grid item>
                    <Paper className={classes.root}>{messages.monday}</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>{messages.tuesday}</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>{messages.wednesday}</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>{messages.thursday}</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>{messages.friday}</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>{messages.saturday}</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>{messages.sunday}</Paper>
                </Grid>
            </Grid>
        )
    }
}