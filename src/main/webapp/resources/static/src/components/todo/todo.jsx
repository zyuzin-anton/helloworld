import React from "react";
import {TodoRow} from "./todo-row";
import TodoHeader from "./todo-header";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    nextTodoMonthHide, nextTodoMonthShow,
    prevTodoMonthHide, prevTodoMonthShow,
    changeTodoDateHide, changeTodoDateShow,
    todoListRequested
} from "../../redux/actions/hello-world-actions";
import TodoCreationDialog from "./todo-creation-dialog";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Box} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import withStyles from "@material-ui/core/styles/withStyles";

@connect(
    (state) => ({
        loading: state.todoListData.loading,
        todoMonth: state.todoListData.todoMonth,
        year: state.todoListData.year,
        month: state.todoListData.month,
        show: state.todoListData.show,
        showDirection: state.todoListData.showDirection
    }),
    (dispatch) => ({
        todoListRequested: bindActionCreators(todoListRequested, dispatch),
        nextTodoMonthHide: bindActionCreators(nextTodoMonthHide, dispatch),
        nextTodoMonthShow: bindActionCreators(nextTodoMonthShow, dispatch),
        prevTodoMonthHide: bindActionCreators(prevTodoMonthHide, dispatch),
        prevTodoMonthShow: bindActionCreators(prevTodoMonthShow, dispatch),
        changeTodoDateHide: bindActionCreators(changeTodoDateHide, dispatch),
        changeTodoDateShow: bindActionCreators(changeTodoDateShow, dispatch)
    })
)
@withStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}))
export default class Todo extends React.Component {

    static propTypes = {
        todoMonth: PropTypes.object,
        loading: PropTypes.bool,
        year: PropTypes.number,
        month: PropTypes.number,
        todoListRequested: PropTypes.func,
        nextTodoMonthHide: PropTypes.func,
        nextTodoMonthShow: PropTypes.func,
        prevTodoMonthHide: PropTypes.func,
        prevTodoMonthShow: PropTypes.func,
        changeTodoDateHide: PropTypes.func,
        changeTodoDateShow: PropTypes.func
    }

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
        const { todoMonth, loading, show, showDirection, year, month, classes } = this.props;
        if (loading) {
            return (
                <Box>
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            )
        }

        return(
            <Box>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            label="Year and Month"
                            value={new Date(year, month - 1)}
                            onChange={this.handleTodoDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <Grid item>
                        You could receive notifications via: <Link target="_blank" rel="noreferrer" href={process.env.TELEGRAM_BOT_URL}>Telegram</Link>
                    </Grid>
                </Grid>
                <Slide direction={showDirection} in={show} mountOnEnter unmountOnExit>
                    <Box>
                        <Grid container justify={'center'}>
                            <IconButton color="primary" aria-label="Previous month"  onClick={this.handlePrevTodoMonth}>
                                <ExpandLessIcon/>
                            </IconButton>
                        </Grid>
                        <TodoHeader/>
                        <TodoCreationDialog/>
                        {
                            [...Array(todoMonth.weeks.length)].map((k, i) =>
                                <TodoRow key={Math.random()} todoForWeek={todoMonth.weeks[i]} month={month}/>
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