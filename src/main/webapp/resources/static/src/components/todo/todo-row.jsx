import React from "react";
import TodoCell from "./todo-cell";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types'

export class TodoRow extends React.Component {
    render() {
        const { todoForWeek } = this.props;

        return(
            <Grid container spacing={1} justify={'center'}>
                {
                    [...Array(7)].map((k, i) =>
                        <TodoCell key={i} todoForDay={todoForWeek.days[i]}/>
                    )
                }
            </Grid>
        )
    }
}

TodoRow.propTypes = {
    todoForWeek: PropTypes.object,
};
