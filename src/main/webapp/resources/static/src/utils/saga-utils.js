import axios from 'axios'
import { call, put } from 'redux-saga/effects'

const get = (url) => {
    return axios.get(url)
        .then( result => result)
        .catch(result => {
            throw result.statusText
        });
};

export function *getOne(url) {
    try {
        return yield call(get, url);
    } catch (error) {
        return {error: error}
    }
}

export function *getOrProcessError(getMethod, setMethod, errorMethod, params = {}) {
    const {data} = yield call(getMethod, params);

    if (data.error) {
        yield put(errorMethod(data))
    } else {
        yield put(setMethod(data))
    }
}