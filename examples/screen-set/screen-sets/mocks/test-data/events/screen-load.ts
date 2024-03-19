import {apiKey} from "../../../helpers/setup/setup";

export const expBeforeScreenLoad = {
    eventName: "beforeScreenLoad",
    context: "{testField: 'testContext'}",
    source: "showScreenSet",
    profile: {},
    data: {},
    preferences: {},
    subscriptions: {},
    response: {},
    nextScreen: 'gigya-register-screen',
    schema: {
        callId: "mock-call-id",
        errorCode: 0,
        status: "OK",
        errorMessage: "",
        statusMessage: "",
        requestParams: {
            connectWithoutLoginBehavior: "alwaysLogin",
            defaultRegScreenSet: "Default-RegistrationLogin",
            defaultMobileRegScreenSet: "Default-RegistrationLogin",
            sessionExpiration: 0,
            rememberSessionExpiration: 0,
            apiDomain: "il1.gigya.com",
            lang: "en",
            APIKey: apiKey,
            screenSet: "Default-RegistrationLogin",
            context: "{testField: 'testContext'}",
            startScreen: "gigya-register-screen",
            source: "showScreenSet",
            pluginsStack: [
                {
                    source: "showScreenSet"
                }
            ],
            lastSource: "showScreenSet",
            _reportedLoad: true,
            deviceType: "auto",
            customLang: {},
            isChild: false
        },
        context: "{testField: 'testContext'}",
        operation: "/accounts.getSchema"
    }
};

export const expAfterScreenLoad = {
    context: "{testField: 'testContext'}",
    eventName: "afterScreenLoad",
    source: "showScreenSet",
    currentScreen: "gigya-register-screen",
    data: {},
    profile: {},
    preferences: {},
    response: {}
};

