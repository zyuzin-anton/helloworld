import { takeLatest } from 'redux-saga/effects'
import { getOrProcessError } from '../../utils'
import { getHelloWorld } from '../../datasources'
import {errorMessageShow, helloWorldMessageOk} from '../actions'

import {
    HELLO_WORLD_MESSAGE_REQUESTED
} from '../action-types'

export function processHelloWorldSagas() {
    return [
        takeLatest(HELLO_WORLD_MESSAGE_REQUESTED, handleFetchHelloWorld),
    ]
}

function *handleFetchHelloWorld() {
    yield getOrProcessError(getHelloWorld, helloWorldMessageOk, errorMessageShow)
}