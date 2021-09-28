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
        takeLatest(LOGOUT, handleLogout)
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
    console.log(error.error.response.data.error_description);
    yield put(loginError(error.error.response.data.error_description))
}

function *handleRefresh({token}) {
    const {data} =  yield call(loginWithParams, {refreshToken: token});

    if (data.access_token) {
        storeTokens(data);

        yield put(refreshSuccess());
    } else {
        console.log("Cannot refresh tokens");
        yield put(logout())
    }
}

function *handleLogout() {
    clearAuthentication();
    const redirectUri = window.location.origin + '/login';
    window.location.assign(process.env.KEYCLOAK_URL + '/auth/realms/hello-world-realm/protocol/openid-connect/logout?redirect_uri=' + redirectUri);
}