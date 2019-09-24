import {takeLatest} from 'redux-saga/effects'
import {getOrProcessError} from "./utils";
import {getHelloWorld} from "./datasource";
import {helloWorldMessageFail, helloWorldMessageOk} from "./actions";

import {
    HELLO_WORLD_MESSAGE_REQUESTED
} from './actions'

export function *processHelloWorldSagas() {
    yield [
        takeLatest(HELLO_WORLD_MESSAGE_REQUESTED, handleFetchHelloWorld)
    ]
}

function *handleFetchHelloWorld() {
    yield getOrProcessError(getHelloWorld, helloWorldMessageOk, helloWorldMessageFail)
}

export function *rootSaga() {
    yield [
        processHelloWorldSagas()
    ]
}