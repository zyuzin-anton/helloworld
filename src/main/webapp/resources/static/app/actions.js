export const HELLO_WORLD_MESSAGE_REQUESTED = 'HELLO_WORLD_MESSAGE_REQUESTED';
export const HELLO_WORLD_MESSAGE_OK = 'HELLO_WORLD_MESSAGE_OK';
export const HELLO_WORLD_MESSAGE_FAIL = 'HELLO_WORLD_MESSAGE_FAIL';

export function helloWorldMessageRequested() {
    return {
        type: 'HELLO_WORLD_MESSAGE_REQUESTED'
    }
}

export function helloWorldMessageOk(message) {
    return {
        type: 'HELLO_WORLD_MESSAGE_OK',
        message: message
    }
}

export function helloWorldMessageFail(errors) {
    return {
        type: 'HELLO_WORLD_MESSAGE_FAIL',
        errors: errors
    }
}