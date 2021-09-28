import {call} from 'redux-saga/effects';
import {login as loginCall} from "../utils/saga-utils";

export function *loginWithParams({code, refreshToken}) {
    const params = new URLSearchParams();
    params.append('client_id', 'hello-world-client');
    if (refreshToken) {
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('scope', 'openid');
    } else {
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', window.location.origin + '/login');
    }

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return yield call(loginCall, process.env.KEYCLOAK_URL + "/auth/realms/hello-world-realm/protocol/openid-connect/token", params, config);
}