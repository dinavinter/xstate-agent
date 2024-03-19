import {
    AccountsIsAvailableLoginIDResponse,
    GigyaResponse,
    Account
} from "gigya";
import { Endpoint, ServerEndpoint, SSOFrameEndpoint } from "../../lib/api/endpoints";
import { ApiMockFactory } from "./mock-factory";

export const defaultResponses = new Map<Endpoint, GigyaResponse>();
Object.keys(ServerEndpoint).forEach(key => {
    defaultResponses.set(ServerEndpoint[key], ApiMockFactory.createResponse<GigyaResponse>());
});
defaultResponses.set(ServerEndpoint.IsAvailableLoginID, ApiMockFactory.createResponse<AccountsIsAvailableLoginIDResponse>({isAvailable: true}));
defaultResponses.set(ServerEndpoint.GetAccountInfo, ApiMockFactory.createResponse<Account>({profile: {}} as Account));
defaultResponses.set(ServerEndpoint.Register, ApiMockFactory.createResponse({sessionInfo: {login_token: "mock-login-token"}}));
defaultResponses.set(ServerEndpoint.Login, ApiMockFactory.createResponse({sessionInfo: {login_token: "mock-login-token"}}));
Object.keys(SSOFrameEndpoint).forEach(key => {
    defaultResponses.set(SSOFrameEndpoint[key], ApiMockFactory.createResponse<GigyaResponse>());
});
defaultResponses.set(SSOFrameEndpoint.GetToken, ApiMockFactory.createResponse({
    login_token: 'mock-sso-login-token',
    expires_in: '36000',
    gltexp: '0'
}));
defaultResponses.set(SSOFrameEndpoint.GetLoginTokenExp, ApiMockFactory.createResponse({
    gltexp: '0'
}));
defaultResponses.set(SSOFrameEndpoint.CheckTokenRenew, ApiMockFactory.createResponse({}));
