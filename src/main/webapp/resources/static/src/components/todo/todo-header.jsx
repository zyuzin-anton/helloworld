import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = (theme) => ({
    root: {
        minWidth: 130
    }
});

class TodoHeader extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={1} justify={'center'}>
                <Grid item>
                    <Paper className={classes.root}>Monday</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>Tuesday</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>Wednesday</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>Thursday</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>Friday</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>Saturday</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.root}>Sunday</Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(TodoHeader);