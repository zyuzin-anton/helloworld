import {gql} from "@redux-requests/graphql";

export const HELLO_WORLD_MESSAGE_REQUESTED = 'HELLO_WORLD_MESSAGE_REQUESTED';
export const HELLO_WORLD_MESSAGE_OK = 'HELLO_WORLD_MESSAGE_OK';
export const HELLO_WORLD_MESSAGE_FAIL = 'HELLO_WORLD_MESSAGE_FAIL';
export const FETCH_HELLO_WORLD = 'FETCH_HELLO_WORLD';

export function helloWorldMessageRequested() {
    return {
        type: HELLO_WORLD_MESSAGE_REQUESTED
    }
}

export function helloWorldMessageOk({description}) {
    return {
        type: HELLO_WORLD_MESSAGE_OK,
        message: description
    }
}

export function helloWorldMessageFail({error}) {
    return {
        type: HELLO_WORLD_MESSAGE_FAIL,
        error: error
    }
}

export function fetchHelloWorld() {
    console.log("qwe!")
    return {
        type: FETCH_HELLO_WORLD,
        request: {
            query: gql`
                {
                    helloWorld(id: 1) {
                        description
                    }
                }
            `
        }
    }
}