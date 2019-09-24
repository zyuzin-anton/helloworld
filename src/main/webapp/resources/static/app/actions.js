import axios from 'axios';

export const HELLO_WORLD_MESSAGE_REQUESTED = 'HELLO_WORLD_MESSAGE_REQUESTED';
export const HELLO_WORLD_MESSAGE_OK = 'HELLO_WORLD_MESSAGE_OK';
export const HELLO_WORLD_MESSAGE_FAIL = 'HELLO_WORLD_MESSAGE_FAIL';

function helloWorldMessageRequested() {
    return {
        type: 'HELLO_WORLD_MESSAGE_REQUESTED'
    }
}

function helloWorldMessageOk(message) {
    return {
        type: 'HELLO_WORLD_MESSAGE_OK',
        message: message
    }
}

function helloWorldMessageFail(errors) {
    return {
        type: 'HELLO_WORLD_MESSAGE_FAIL',
        errors: errors
    }
}

export function loadHelloWoldMessage() {
    return dispatch => {
        dispatch(helloWorldMessageRequested());

        axios.get(
            '/rest/hello/world?id=1'
        ).then(result => {
            dispatch(helloWorldMessageOk(result.data))
        }).catch(result => {
            dispatch(helloWorldMessageFail(result.statusText))
        })
    }
}