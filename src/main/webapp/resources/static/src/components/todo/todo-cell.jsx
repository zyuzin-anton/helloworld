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

class TodoCell extends React.Component {

    render() {
        const { todoForDay, todoCreationDialogOpen, deleteTodo, disabled } = this.props;
        return (
            <Grid item>
                <Card sx={{
                    width: 128,
                    height: 128
                }} onClick={() => !disabled && todoCreationDialogOpen(todoForDay.day)}>
                    <CardHeader title={todoForDay.day} titleTypographyProps={{color: disabled ? "textSecondary" : "primary"}}/>
                    <CardContent>
                        {
                            todoForDay.todoCells && todoForDay.todoCells.map((todoCell, key) =>
                                <Typography>
                                    { !disabled ?
                                        <Chip
                                            size="small"
                                            color="primary"
                                            label={todoCell.time + ': ' + todoCell.description}
                                            onDelete={() => deleteTodo(todoCell.id)}
                                        /> :
                                        <Chip
                                            size="small"
                                            label={todoCell.time + ': ' + todoCell.description}
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
    todoForDay: PropTypes.array,
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
)(TodoCell)