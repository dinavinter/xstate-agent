import {apiKey} from "../../helpers/setup/setup";

export function mockSession(loginToken = 'mock-login-token') {
    document.cookie = `glt_${apiKey}=${loginToken}`;
}

export function removeMockSession() {
    document.cookie = `glt_${apiKey}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}