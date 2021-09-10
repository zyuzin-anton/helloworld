import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logout} from "../../redux/actions/hello-world-actions";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
});

class NavBar extends React.Component {
    render() {
        const {logout, classes} = this.props;
        return (<AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Menu
                </Typography>
                <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>)
    }
}

NavBar.propTypes = {
    logout: PropTypes.func
};

export default connect(
    (state) => ({}),
    (dispatch) => ({
        logout: bindActionCreators(logout, dispatch)
    })
)(withStyles(useStyles)(NavBar))