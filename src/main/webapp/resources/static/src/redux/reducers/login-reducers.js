import {LOGIN_ERROR} from "../action-types";

const defaultState = {};

export function loginReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_ERROR: return loginErrorReducer(action.errorMessage);
        default: return state
    }
}

export function loginErrorReducer(errorMessage) {
    return {
        errorMessage
    }
}