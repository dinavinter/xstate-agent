import { Endpoint } from "./endpoints";
import mockBackend from "./mock-backend";
import { parse, stringify } from 'query-string';

class MockPopup {

    public async getMessage(endpoint: Endpoint, params: {[key: string]: any}): Promise<string> {
        const response = await mockBackend.getResponse(endpoint, params);
        const stateParams = parse(decodeURIComponent(params['state']), {decode: false});
        response['id'] = stateParams['id'];
        const eventObj = escape(stringify(response, {encode: false}));
        return `${stateParams['id']}=${eventObj}`
    }

    public close(): void {
        // needed because OauthRequest.afterResponse tries to close the opened window
    }
}

export default new MockPopup();
