import { call } from 'redux-saga/effects'
import { getOne } from '../utils'

export function *getHelloWorld() {
    return yield call(getOne, "/rest/hello/world?id=1");
}