import { gql } from '@redux-requests/graphql'

import {
    HELLO_WORLD_MESSAGE_REQUESTED,
    HELLO_WORLD_MESSAGE_OK,
    HELLO_WORLD_MESSAGE_FAIL,
    FETCH_HELLO_WORLD,
    LOGIN_REQUESTED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REFRESH_TOKEN,
    REFRESH_SUCCESS,
    LOGOUT,
    LOGIN_ERROR
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

export function loginRequested(login, password) {
    return {
        type: LOGIN_REQUESTED,
        login: login,
        password: password
    }
}

export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token
    }
}

export function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        error
    }
}

export function loginRefreshToken(token) {
    return {
        type: LOGIN_REFRESH_TOKEN,
        token
    }
}

export function refreshSuccess() {
    return {
        type: REFRESH_SUCCESS
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function loginError(errorMessage) {
    return {
        type: LOGIN_ERROR,
        errorMessage
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