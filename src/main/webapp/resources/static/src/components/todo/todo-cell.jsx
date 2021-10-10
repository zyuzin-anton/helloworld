import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {todoCreationDialogOpen, deleteTodo} from "../../redux/actions/hello-world-actions";
import dateFormat from "dateformat";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = (theme) => ({
    root: {
        minWidth: 140,
        minHeight: 150
    }
});

class TodoCell extends React.Component {

    render() {
        const { todoForDay, todoCreationDialogOpen, deleteTodo, disabled, classes } = this.props;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let cellDate = new Date(todoForDay.year, todoForDay.month - 1, todoForDay.day);

        const isToday = cellDate.getTime() === currentDate.getTime();
        const isPastDate = cellDate.getTime() < currentDate.getTime();
        return (
            <Grid item>
                <Card className={classes.root}
                    onClick={() => !disabled && todoCreationDialogOpen(todoForDay.day)}
                    raised={isToday}
                >
                    <CardHeader title={todoForDay.day} titleTypographyProps={{color: disabled ? "textSecondary" : isPastDate ? "secondary" : "primary"}}/>
                    <CardContent>
                        {
                            todoForDay.todoCells && todoForDay.todoCells.sort((a, b) => a.time > b.time ? 1 : -1) && todoForDay.todoCells.map((todoCell, key) =>
                                <Typography>
                                    { !disabled ?
                                        <Chip
                                            size="small"
                                            color={new Date(todoCell.time).getTime() < currentDate.getTime() ? "secondary" : "primary"}
                                            label={dateFormat(todoCell.time, 'HH:MM') + ': ' + todoCell.description}
                                            onDelete={() => deleteTodo(todoCell.id)}
                                        /> :
                                        <Chip
                                            size="small"
                                            label={dateFormat(todoCell.time, 'HH:MM') + ': ' + todoCell.description}
                                        />
                                    }
                                </Typography>
                            )
                        }
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

TodoCell.propTypes = {
    todoForDay: PropTypes.object,
    disabled: PropTypes.bool,
    todoCreationDialogOpen: PropTypes.func,
    deleteTodo: PropTypes.func
};

export default connect(
    (state) => ({}),
    (dispatch) => ({
        todoCreationDialogOpen: bindActionCreators(todoCreationDialogOpen, dispatch),
        deleteTodo: bindActionCreators(deleteTodo, dispatch)
    })
)(withStyles(useStyles)(TodoCell))