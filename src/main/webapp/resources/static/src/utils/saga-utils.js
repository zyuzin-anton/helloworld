import axios from 'axios'
import { call, put, take } from 'redux-saga/effects'
import {getAccessToken, getRefreshToken} from "./login-utils";
import {loginRefreshToken} from "../redux/actions/hello-world-actions";
import {REFRESH_SUCCESS} from "../redux/action-types";

const request = (method, url) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
    };
    return axios({
        method: method,
        url: url,
        headers: headers
    })
        .then( result => result)
        .catch(result => {
            if (result.response.status === 401) {
                return {status: 401}
            }
            throw result
        });
};

export function *one(method, url) {
    try {
        let response =  yield call(request, method, url);
        if (response.status && response.status === 401) {
            yield put(loginRefreshToken(getRefreshToken()));
            yield take(REFRESH_SUCCESS);

            response = yield call(request, method, url);
        }
        return response
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

const loginRequest = (url, params, config) => {
    return axios.post(url, params, config)
        .then(result => result)
        .catch(result => {
            throw result
        })
};

export function *login(url, params = {}, config = {}) {
    try {
        return yield call(loginRequest, url, params, config);
    } catch (error) {
        return {data: {error: error}}
    }
}