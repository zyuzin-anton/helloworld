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
import {
    logout,
    handleDrawerOpen,
    handleDrawerClose,
    handleUserMenuOpen,
    handleUserMenuClose
} from "../../redux/actions";
import Menu from "./menu";
import jwt_decode from "jwt-decode";
import {getAccessToken} from "../../utils";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Skeleton from "@material-ui/lab/Skeleton";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

@connect(
    (state) => ({
        open: state.navBarData.open,
        userMenuOpen: state.navBarData.userMenuOpen
    }),
    (dispatch) => ({
        logout: bindActionCreators(logout, dispatch),
        handleDrawerOpen: bindActionCreators(handleDrawerOpen, dispatch),
        handleDrawerClose: bindActionCreators(handleDrawerClose, dispatch),
        handleUserMenuOpen: bindActionCreators(handleUserMenuOpen, dispatch),
        handleUserMenuClose: bindActionCreators(handleUserMenuClose, dispatch)
    })
)
@withStyles(theme => ({
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
}))
export default class NavBar extends React.Component {

    static propTypes = {
        logout: PropTypes.func,
        handleDrawerOpen: PropTypes.func,
        handleDrawerClose: PropTypes.func,
        handleUserMenuOpen: PropTypes.func,
        handleUserMenuClose: PropTypes.func,
        open: PropTypes.bool,
        userMenuOpen: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.anchorRef = React.createRef();
    }

    render() {
        const {logout, classes, handleDrawerOpen, handleDrawerClose, open, handleUserMenuOpen, handleUserMenuClose, userMenuOpen} = this.props;
        const jwt = jwt_decode(getAccessToken());
        const drawerWidth = 240;
        return (<Box>
            <div className={classes.appBar}>
                 <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Menu
                        </Typography>
                        {
                            jwt ?
                                <Button
                                    ref={this.anchorRef}
                                    color="inherit"
                                    aria-controls={userMenuOpen ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleUserMenuOpen}
                                >
                                    {jwt.preferred_username}<ArrowDropDownIcon/>
                                </Button> :
                                <Skeleton animation="wave" />
                        }
                        <Popper open={userMenuOpen} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleUserMenuClose}>
                                            <MenuList autoFocusItem={userMenuOpen} id="menu-list-grow">
                                                <MenuItem onClick={logout}>Logout</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
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