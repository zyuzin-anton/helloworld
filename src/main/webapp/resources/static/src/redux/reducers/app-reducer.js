import {ERROR_MESSAGE_CLOSE, ERROR_MESSAGE_SHOW} from "../action-types";

const defaultState = {
    error: null
};

export function appReducer(state = defaultState, action) {
    switch (action.type) {
        case ERROR_MESSAGE_SHOW: return handleErrorMessageShow(state, action.error);
        case ERROR_MESSAGE_CLOSE: return handleErrorMessageClose(state);
        default: return state;
    }
}

function handleErrorMessageShow(state, error) {
    return {...state, error}
}

function handleErrorMessageClose(state) {
    return {...state, error: null}
}
