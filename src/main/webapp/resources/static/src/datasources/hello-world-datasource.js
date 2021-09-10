import { call } from 'redux-saga/effects'
import { one } from '../utils'

export function *getHelloWorld() {
    return yield call(one, 'get', '/rest/hello/world?id=1');
}