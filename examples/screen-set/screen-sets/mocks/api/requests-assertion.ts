enum RequestType {
    GET = 'GET',
    POST = 'POST'
}

export function requestsAssertion(requestType: RequestType, requestParams: any, requestSetting: any) {
    if (requestSetting.forcePost || requestParams['login_token']) {
        expect(requestType).toEqual(RequestType.POST);
    }
}
