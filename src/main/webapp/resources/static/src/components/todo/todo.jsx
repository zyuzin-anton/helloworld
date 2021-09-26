import React from "react";
import {TodoRow} from "./todo-row";
import {TodoHeader} from "./todo-header";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    nextTodoMonthHide, nextTodoMonthShow,
    prevTodoMonthHide, prevTodoMonthShow,
    changeTodoDateHide, changeTodoDateShow,
    todoErrorMessageClose,
    todoListRequested
} from "../../redux/actions/hello-world-actions";
import TodoCreationDialog from "./todo-creation-dialog";
import Snackbar from "@material-ui/core/Snackbar";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Box} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.handleNextTodoMonth = this.handleNextTodoMonth.bind(this);
        this.handlePrevTodoMonth = this.handlePrevTodoMonth.bind(this);
        this.handleTodoDateChange = this.handleTodoDateChange.bind(this);
    }

    componentDidMount() {
        const { year, month } = this.props;
        this.props.todoListRequested(year, month)
    }

    handleNextTodoMonth() {
        const { year, month, nextTodoMonthHide, nextTodoMonthShow, todoListRequested } = this.props;
        nextTodoMonthHide();

        const date = new Date();
        date.setFullYear(year, month);
        date.setMonth(date.getMonth() + 1);

        todoListRequested(date.getFullYear(), date.getMonth());

        nextTodoMonthShow();
    }

    handlePrevTodoMonth() {
        const { year, month, prevTodoMonthHide, prevTodoMonthShow, todoListRequested } = this.props;
        prevTodoMonthHide();

        const date = new Date();
        date.setFullYear(year, month);
        date.setMonth(date.getMonth() - 1);

        todoListRequested(date.getFullYear(), date.getMonth());

        prevTodoMonthShow();
    }

    handleTodoDateChange(date) {
        const { changeTodoDateHide, changeTodoDateShow, todoListRequested } = this.props;

        changeTodoDateHide();
        todoListRequested(date.getFullYear(), date.getMonth() + 1);
        changeTodoDateShow();
    }

    render() {
        const { todoMonth, loading, error, todoErrorMessageClose, show, showDirection, year, month } = this.props;
        if (loading) {
            return (
                <div>
                    loading...
                </div>
            )
        }

        return(
            <Box>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <DatePicker
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            label="Year and Month"
                            helperText="Year and month"
                            value={new Date(year, month - 1)}
                            onChange={this.handleTodoDateChange}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Slide direction={showDirection} in={show} mountOnEnter unmountOnExit>
                    <Box>
                        <Grid container justify={'center'}>
                            <IconButton color="primary" aria-label="Previous month"  onClick={this.handlePrevTodoMonth}>
                                <ExpandLessIcon/>
                            </IconButton>
                        </Grid>
                        <TodoHeader/>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            open={error}
                            onClose={todoErrorMessageClose}
                            message={error}
                            key={'bottomleft'}
                        />
                        <TodoCreationDialog/>
                        {
                            [...Array(todoMonth.weeks.length)].map((k, i) =>
                                <TodoRow key={Math.random()} todoForWeek={todoMonth.weeks[i]}/>
                            )
                        }
                        <Grid container justify={'center'}>
                            <IconButton color="primary" aria-label="Next month" onClick={this.handleNextTodoMonth}>
                                <ExpandMoreIcon/>
                            </IconButton>
                        </Grid>
                    </Box>
                </Slide>
            </Box>
        )
    }
}

Todo.propTypes = {
    todoMonth: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    year: PropTypes.number,
    month: PropTypes.number,
    todoListRequested: PropTypes.func,
    todoErrorMessageClose: PropTypes.func,
    nextTodoMonthHide: PropTypes.func,
    nextTodoMonthShow: PropTypes.func,
    prevTodoMonthHide: PropTypes.func,
    prevTodoMonthShow: PropTypes.func,
    changeTodoDateHide: PropTypes.func,
    changeTodoDateShow: PropTypes.func
};

export default connect(
    (state) => ({
        loading: state.todoListData.loading,
        todoMonth: state.todoListData.todoMonth,
        error: state.todoListData.error,
        year: state.todoListData.year,
        month: state.todoListData.month,
        show: state.todoListData.show,
        showDirection: state.todoListData.showDirection
    }),
    (dispatch) => ({
        todoListRequested: bindActionCreators(todoListRequested, dispatch),
        todoErrorMessageClose: bindActionCreators(todoErrorMessageClose, dispatch),
        nextTodoMonthHide: bindActionCreators(nextTodoMonthHide, dispatch),
        nextTodoMonthShow: bindActionCreators(nextTodoMonthShow, dispatch),
        prevTodoMonthHide: bindActionCreators(prevTodoMonthHide, dispatch),
        prevTodoMonthShow: bindActionCreators(prevTodoMonthShow, dispatch),
        changeTodoDateHide: bindActionCreators(changeTodoDateHide, dispatch),
        changeTodoDateShow: bindActionCreators(changeTodoDateShow, dispatch)
    })
)(Todo)