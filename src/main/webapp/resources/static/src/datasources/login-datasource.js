import {call} from 'redux-saga/effects';
import {login as loginCall} from "../utils/saga-utils";


export function *loginWithParams({login, password, refreshToken}) {
    const params = new URLSearchParams();
    params.append('client_id', 'hello-world-client');
    if (refreshToken) {
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
    } else {
        params.append('grant_type', 'password');
        params.append('username', login);
        params.append('password', password);
    }
    params.append('scope', 'openid');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return yield call(loginCall, process.env.KEYCLOAK_URL + "/auth/realms/hello-world-realm/protocol/openid-connect/token", params, config);
}