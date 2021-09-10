import {call, put, takeLatest} from 'redux-saga/effects'
import {loginWithParams} from "../../datasources/login-datasource";
import {getOrProcessError, storeTokens} from "../../utils";
import {loginError, loginFailed, loginSuccess, logout, refreshSuccess} from "../actions/hello-world-actions";
import appRoutes from '../../utils/app-routes'
import {
    LOGIN_FAILED,
    LOGIN_REQUESTED,
    LOGIN_SUCCESS,
    LOGIN_REFRESH_TOKEN, LOGOUT
} from "../action-types";
import {clearAuthentication} from "../../utils/login-utils";

export function processLoginSagas({history}) {
    return [
        takeLatest(LOGIN_REQUESTED, submitLogin),
        takeLatest(LOGIN_SUCCESS, setTokens, history),
        takeLatest(LOGIN_FAILED, showLoginErrorMessage),
        takeLatest(LOGIN_REFRESH_TOKEN, handleRefresh),
        takeLatest(LOGOUT, handleLogout, history)
    ]
}

function *submitLogin(loginData) {
    yield getOrProcessError(loginWithParams, loginSuccess, loginFailed, loginData);
}

function *setTokens(history, {token}) {
    storeTokens(token);
    yield history.push(appRoutes.ROOT);
}

function *showLoginErrorMessage({error}) {
    //alert(error.response.data.error);
    console.log(error.error.response.data.error_description);
    yield put(loginError(error.error.response.data.error_description))
}

function *handleRefresh({token}) {
    const {data} =  yield call(loginWithParams, {refreshToken: token});

    if (data.access_token) {
        storeTokens(data);
     //   yield put(updateAbility(accessToken));

        yield put(refreshSuccess());
    } else {
        //alert
        console.log("Cannot refresh tokens");
        yield put(logout())
    }
}

function *handleLogout(history) {
    clearAuthentication();
    yield history.push(appRoutes.LOGIN)
}