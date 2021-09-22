import {DRAWER_CLOSE, DRAWER_OPEN} from "../action-types";

const defaultState = {
    open: false
};

export function navBarReducer(state = defaultState, action) {
    switch (action.type) {
        case DRAWER_OPEN: return drawerOpen();
        case DRAWER_CLOSE: return drawerClose();
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