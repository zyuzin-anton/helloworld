const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export function storeTokens({access_token, refresh_token}) {
    window.localStorage.setItem(ACCESS_TOKEN, access_token);
    window.localStorage.setItem(REFRESH_TOKEN, refresh_token)
}

export function getAccessToken() {
    return window.localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN);
}

export function clearAuthentication() {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.removeItem(REFRESH_TOKEN);
}

export function isAuthenticated() {
    const authToken = getAccessToken();
    return !!(authToken);
}