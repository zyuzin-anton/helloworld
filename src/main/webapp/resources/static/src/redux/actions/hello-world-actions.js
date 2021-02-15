import { gql } from '@redux-requests/graphql'

import {
    HELLO_WORLD_MESSAGE_REQUESTED,
    HELLO_WORLD_MESSAGE_OK,
    HELLO_WORLD_MESSAGE_FAIL,
    FETCH_HELLO_WORLD
} from '../action-types'

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