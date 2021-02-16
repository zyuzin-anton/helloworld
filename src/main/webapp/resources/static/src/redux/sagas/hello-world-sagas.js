import { takeLatest } from 'redux-saga/effects'
import { getOrProcessError } from '../../utils'
import { getHelloWorld } from '../../datasources'
import { helloWorldMessageFail, helloWorldMessageOk } from '../actions'

import {
    HELLO_WORLD_MESSAGE_REQUESTED
} from '../action-types'

export function *helloWorldSaga() {
    yield* [
        processHelloWorldSagas()
    ]
}

function *processHelloWorldSagas() {
    yield* [
        takeLatest(HELLO_WORLD_MESSAGE_REQUESTED, handleFetchHelloWorld)
    ]
}

function *handleFetchHelloWorld() {
    yield getOrProcessError(getHelloWorld, helloWorldMessageOk, helloWorldMessageFail)
}