import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import {logout, handleDrawerOpen, handleDrawerClose} from "../../redux/actions";
import Menu from "./menu";

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        "& .MuiPaper-root": {
            color: '#fff',
            backgroundColor: '#3f51b5'
        }
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }
});

class NavBar extends React.Component {
    render() {
        const {logout, classes, handleDrawerOpen, handleDrawerClose, open} = this.props;
        return (<Box sx={{ display: 'flex' }}>
            <div className={classes.appBar}>
                 <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Menu
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Menu/>
            </Drawer>
        </Box>)
    }
}

NavBar.propTypes = {
    logout: PropTypes.func,
    handleDrawerOpen: PropTypes.func,
    handleDrawerClose: PropTypes.func,
    open: PropTypes.bool
};

export default connect(
    (state) => ({
        open: state.navBarData.open
    }),
    (dispatch) => ({
        logout: bindActionCreators(logout, dispatch),
        handleDrawerOpen: bindActionCreators(handleDrawerOpen, dispatch),
        handleDrawerClose: bindActionCreators(handleDrawerClose, dispatch)
    })
)(withStyles(useStyles)(NavBar))