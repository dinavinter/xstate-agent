import {GigyaResponse} from 'gigya';
import {Endpoint} from './endpoints';
import {ApiMockFactory} from '../../mocks/api/mock-factory';
import {setTimeoutForOperation} from '../../helpers/utils';
import {GSErrors} from '../../../../../src/core/Gigya.Js/app/GSErrors';
import {isFunction} from 'lodash';

export type MockResponse = GigyaResponse | ((reqParams: { [key: string]: any }) => GigyaResponse);

export interface IRequestConditions {
    endpoint: string;
    params?: { [key: string]: any }
    filter?: (params: { [key: string]: any }) => boolean
}

export interface IProxyResponse {
    interceptors: IInterceptionFn[];
    conditions: IRequestConditions;
    response: MockResponse;
}

export type IInterceptionFn = (params?: { [key: string]: any }, response?: GigyaResponse) => Promise<GigyaResponse> | GigyaResponse | void;

export interface IProxyMiddleware {
    run(req: IRequestConditions, responseCandidates: IProxyResponse[]): IProxyResponse[];
}

export class ProxyResponse implements IProxyResponse {

    public conditions: IRequestConditions;
    public response: MockResponse ;
    public interceptors: IInterceptionFn[] = [];

    constructor(endpoint: string) {
        this.conditions = {
            endpoint: endpoint,
            params: {}
        };
    }

    public withParams(params: { [key: string]: any }): ProxyResponse {
        this.conditions.params = params;
        return this;
    }

    public where(filter: (params: { [key: string]: any }) => boolean): ProxyResponse {
        this.conditions.filter = filter;
        return this;
    }

    public filter(filterFn: (params: { [key: string]: any }) => boolean): ProxyResponse {
        this.conditions.filter = filterFn;
        return this;
    }

    public returnResponse<T extends MockResponse>(response: T): ProxyResponse {
        this.response = response;
        return this;
    }

    public addParams(additionalResponseParams: { [key: string]: any }): ProxyResponse {
        this.response = Object.assign(this.response, additionalResponseParams);
        return this;
    }

    public returnError(err: GSErrors): ProxyResponse {
        this.response = <GigyaResponse> ApiMockFactory.createResponse({errorCode: err});
        return this;
    }

    public returnOk(resParams: { [key: string]: any } = {}): ProxyResponse {
        this.returnError(GSErrors.OK);
        this.addParams(resParams);
        return this;
    }

    public return(overrideResponsePredicate: (params: {[key: string]: string}) => { [key: string]: any }) {
        this.returnOk();
        this.interceptors.push((req, res) => {
            return Object.assign(res, overrideResponsePredicate(req));
        });
        return this;
    }

    public waitForRequest(): Promise<ProxyResponse> {
        const timeoutId = setTimeoutForOperation(`"${this.conditions.endpoint}"`);
        return new Promise(r => this.interceptors.push(() => {
            setTimeout(() => {
                clearTimeout(timeoutId);
                r(this);
            }, 0)
        }));
    }
}

export class MockBackend {

    private _responses: IProxyResponse[];
    private _middleware: IProxyMiddleware[];

    public received: jasmine.Spy;

    constructor() {
        this._middleware = [];
        this._responses = [];
    }

    public init() {
        this._responses = [];
        this.received = spyOn(gigya.XhrRequest.prototype, 'performSend').and.callThrough();
    }

    public resetCalls() {
        this.received.calls.reset();
    }

    public use(middleware: IProxyMiddleware) {
        this._middleware.push(middleware)
    }

    public when(endpoint: Endpoint, params: { [key: string]: any } = {}): ProxyResponse {
        const proxyResponse = new ProxyResponse(endpoint);
        this._responses.push(proxyResponse.withParams(params));
        return proxyResponse;
    }

    public getResponse(endpoint: Endpoint, requestParams: { [key: string]: any }): Promise<GigyaResponse> {

        try {

            // create a copy of the mock responses array;
            let responseCandidates = this._responses.map(x => Object.create(x) as IProxyResponse);

            // run each middleware with the result of each other until we reduce the candidates into one matching response
            this._middleware.forEach(middleware => {
                responseCandidates = middleware.run(
                    Object.assign({}, {endpoint, params: requestParams}),
                    responseCandidates);
            });

            if (!responseCandidates || !responseCandidates.length || !responseCandidates[0] || !responseCandidates[0].response)
                return Promise.reject<GigyaResponse>(new Error(`[${endpoint}]: Missing response setup for ${endpoint}`));

            if (responseCandidates.length > 1)
                return Promise.reject<GigyaResponse>(`[${endpoint}]: more than one response matches the request for ${endpoint}`);

            const proxyResponse = responseCandidates[0];
            const res = isFunction(proxyResponse.response) ?
                proxyResponse.response(requestParams) :
                proxyResponse.response;

            let response = JSON.parse(JSON.stringify(res));
            proxyResponse.interceptors.forEach(interceptor => {
                const responseOverride = interceptor(requestParams, response);
                if (responseOverride)
                    response = responseOverride;
            });

            return Promise.resolve(response);

        } catch (e) {
            console.error('error in MockBackend.getResponse', e)
        }
    }
}

export function whenFetch<T>(endpoint: Endpoint | RegExp, response: T) {
    const res = ApiMockFactory.createResponse<T>(response)
    spyOn(window, 'fetch')
        .withArgs(jasmine.stringMatching(endpoint))
        .and.resolveTo({
        ok: true,
        json: () => {
            return new Promise(resolve => {
                resolve(res);
            })
        }
    } as Response);
}

export default new MockBackend();
