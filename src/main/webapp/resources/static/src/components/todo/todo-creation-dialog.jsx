import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createTodo, todoCreationDialogClose} from "../../redux/actions/hello-world-actions";
import dateFormat from "dateformat";
import FormControl from "@material-ui/core/FormControl";

class TodoCreationDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            time: '12:00'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        console.log("Set state: ", id, value);
        this.setState({ [id]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { description, time } = this.state;
        const { date } = this.props;
        date.setHours(parseInt(time.split(":")[0]), parseInt(time.split(":")[1]), 0, 0);
        this.props.createTodo(dateFormat(date, "yyyy-mm-dd'T'HH:MM:sso"), description);
        this.props.todoCreationDialogClose();
    }

    render() {
        const { open, todoCreationDialogClose, date } = this.props;
        const formattedDate = dateFormat(date, 'yyyy-mm-dd');
        return (
            <Dialog open={open} onClose={todoCreationDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New To Do</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What to do?
                    </DialogContentText>
                    <TextField
                        id="date"
                        label="Todo Date"
                        type="date"
                        defaultValue={formattedDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        id="time"
                        label="Todo Time"
                        type="time"
                        defaultValue="12:00"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            step: 300, // 5 min
                        }}
                        onChange={this.handleChange}
                    />
                    <div/>
                    <FormControl fullWidth>
                        <TextField
                            autoFocus
                            id="description"
                            label="To Do"
                            placeholder="I want to do..."
                            multiline
                            rows={4}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={todoCreationDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

TodoCreationDialog.propTypes = {
    open: PropTypes.bool,
    handleCloseTodoCreationDialog: PropTypes.func
};

export default connect(
    (state) => ({
        open: state.todoListData.todoCreationDialog.open,
        date: state.todoListData.todoCreationDialog.date
    }),
    (dispatch) => ({
        todoCreationDialogClose: bindActionCreators(todoCreationDialogClose, dispatch),
        createTodo: bindActionCreators(createTodo, dispatch)
    })
)(TodoCreationDialog)