import {DRAWER_CLOSE, DRAWER_OPEN, USER_MENU_CLOSE, USER_MENU_OPEN} from "../action-types";

const defaultState = {
    open: false,
    userMenuOpen: false
};

export function navBarReducer(state = defaultState, action) {
    switch (action.type) {
        case DRAWER_OPEN: return drawerOpen();
        case DRAWER_CLOSE: return drawerClose();
        case USER_MENU_OPEN: return userMenuOpen();
        case USER_MENU_CLOSE: return userMenuClose();
        default: return state
    }
}

function drawerOpen() {
    return {
        open: true
    }
}

function drawerClose() {
    return {
        open: false
    }
}

function userMenuOpen() {
    return {
        userMenuOpen: true
    }
}

function userMenuClose() {
    return {
        userMenuOpen: false
    }
}