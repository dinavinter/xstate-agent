import {apiKey} from "../../../helpers/setup/setup";

export const expBeforeValidation = {
    eventName: "beforeValidation",
    source: "showScreenSet",
    context: "{testField: 'testContext'}",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    formData: {email: 'some@email.com', password: 'password', passwordRetype: 'password'},
    data: {},
    profile: {},
    subscriptions: {},
    preferences: {}
};

export const expBeforeSubmit = {
    eventName: "beforeSubmit",
    source: "showScreenSet",
    context: "{testField: 'testContext'}",
    data: {},
    subscriptions: {},
    profile: {},
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    formData: {email: 'some@email.com', passwordRetype: 'password'},
    preferences: {}
};

export const expSubmit = {
    eventName: "submit",
    source: "showScreenSet",
    context: "{testField: 'testContext'}",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    accountInfo: {
        data: {},
        profile: {},
        subscriptions: {},
        preferences: {}
    },
    formModel: {email: 'some@email.com', password: 'password', passwordRetype: 'password'}
};

export const expAfterValidation = {
    "data": {},
    "profile": {},
    "subscriptions": {},
    "preferences": {},
    "eventName": "afterValidation",
    "form": "gigya-register-form",
    "formData": {
        "email": "some@email.com",
        "profile.firstName": "first",
        "profile.lastName": "last",
        "password": "password",
        "passwordRetype": "password",
        "data.subscribe": false,
        "data.terms": false
    },
    "screen": "gigya-register-screen",
    "context": "{testField: 'testContext'}",
    "source": "showScreenSet",
    "instanceID": "screenSet"
};

export const expAfterSubmit = {
    screenSetID: "Default-RegistrationLogin",
    eventName: "afterSubmit",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    profile: {},
    data: {},
    preferences: {},
    response: {
        callId: "mock-call-id",
        errorCode: 0,
        identities: Object({}),
        status: "OK",
        errorMessage: "",
        statusMessage: "",
        context: "{testField: 'testContext'}",
        operation: "/accounts.register",
        sessionInfo: {login_token: "mock-login-token"},
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
            isChild: false,
            email: "some@email.com",
            passwordRetype: 'password',
            finalizeRegistration: true,
            dontHandleScreenSet: true,
            include: "profile,data,emails,loginIDs,subscriptions,preferences",
        }
    },
    subscriptions: {}
};
export const expError = {
    eventName: "error",
    source: "showScreenSet",
    context: "{testField: 'testContext'}",
    response: {
        statusMessage: "",
        errorMessage: "There are errors in your form, please try again",
        errorCode: 400006,
        errorDetails: "screenSet",
        params: {
            screenSet: "Default-RegistrationLogin",
            connectWithoutLoginBehavior: "alwaysLogin",
            defaultRegScreenSet: "Default-RegistrationLogin",
            defaultMobileRegScreenSet: "Default-RegistrationLogin",
            sessionExpiration: 0,
            rememberSessionExpiration: 0,
            apiDomain: "il1.gigya.com",
            lang: "en",
            APIKey: apiKey,
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
        info: {
            screen: "gigya-register-screen",
            form: "gigya-register-form",
            response: {
                errorCode: 400006,
                status: "FAIL",
                errorMessage: "There are errors in your form, please try again",
                statusMessage: "",
                requestParams: {
                    connectWithoutLoginBehavior: "alwaysLogin",
                    defaultRegScreenSet: "Default-RegistrationLogin",
                    defaultMobileRegScreenSet: "Default-RegistrationLogin",
                    sessionExpiration: 0,
                    rememberSessionExpiration: 0,
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
                    isChild: false,
                    email: "some@email.com",
                    passwordRetype: 'password',
                    finalizeRegistration: true,
                    dontHandleScreenSet: true,
                    include: "profile,data,emails,loginIDs,subscriptions,preferences"
                },
                context: "{testField: 'testContext'}",
                operation: "/accounts.register"
            }
        }
    },
    status: "FAIL",
    statusMessage: "General Server Error",
    errorMessage: "There are errors in your form, please try again",
    errorDetails: "screenSet",
    errorCode: 400006,
};


export const expBeforeValidationWithError = {
    eventName: "beforeValidation",
    source: "showScreenSet",
    context: "{testField: 'testContext'}",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    formData: {email: 'some@email.com', password: 'password', passwordRetype: 'password'},
    data: {},
    profile: {},
    subscriptions: {},
    preferences: {}
};

export const expBeforeSubmitWithError = {
    eventName: "beforeSubmit",
    source: "showScreenSet",
    context: "{testField: 'testContext'}",
    data: {},
    subscriptions: {},
    profile: {},
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    formData: {email: 'some@email.com', passwordRetype: 'password'},
    preferences: {}
};

export const expSubmitWithError = {
    eventName: "submit",
    source: "showScreenSet",
    context: "{testField: 'testContext'}",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    accountInfo: {
        data: {},
        profile: {},
        subscriptions: {},
        preferences: {}
    },
    formModel: {email: 'some@email.com', password: 'password', passwordRetype: 'password'}
}


export const expAfterSubmitWithError = {
    eventName: "afterSubmit",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    profile: {},
    data: {},
    preferences: {},
    subscriptions: {},
    response: {
        errorCode: 400006,
        status: "FAIL",
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
            isChild: false,
            email: "some@email.com",
            passwordRetype: 'password',
            finalizeRegistration: true,
            dontHandleScreenSet: true,
            include: "profile,data,emails,loginIDs,subscriptions,preferences"
        },
        context: "{testField: 'testContext'}",
        operation: "/accounts.register"
    },
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};

export const expAfterSubmitSocial = {
    "eventName": "afterSubmit",
    "screen": "gigya-register-screen",
    "form": "div.gigya-social-login",
    "profile": {},
    "data": {},
    "preferences": {},
    "subscriptions": {},
    "response": {
        "UID": "mock-uid",
        "socialProviders": "facebook",
        "callId": "mock-call-id",
        "errorCode": "0",
        "newUser": false,
        "user": {
            "nickname": "",
            "photoURL": "",
            "thumbnailURL": "",
            "birthDay": "",
            "birthMonth": "",
            "birthYear": "",
            "gender": "",
            "email": "",
            "proxiedEmail": "",
            "country": "",
            "state": "",
            "city": "",
            "zip": "",
            "firstName": "",
            "lastName": "",
            "profileURL": "",
            "age": "",
            "UID": "mock-uid",
            "isSiteUID": "",
            "isLoggedIn": "",
            "isConnected": "",
            "isSiteUser": "",
            "identities": {},
            "providers": [],
            "timestamp": "",
            "UIDSig": "",
            "UIDSignature": "",
            "signatureTimestamp": "",
            "loginProvider": "facebook",
            "loginProviderUID": "",
            "capabilities": {},
            "errorCode": 0
        },
        "status": "OK",
        "errorMessage": "",
        "statusMessage": "",
        "requestParams": {
            "connectWithoutLoginBehavior": "alwaysLogin",
            "defaultRegScreenSet": "Default-RegistrationLogin",
            "defaultMobileRegScreenSet": "Default-RegistrationLogin",
            "sessionExpiration": 0,
            "rememberSessionExpiration": 0,
            "lang": "en",
            "APIKey": "mock-api-key",
            "width": "420",
            "height": "100",
            "requiredCapabilities": "login",
            "pagingButtonStyle": "newArrows",
            "UIMode": "Login",
            "_callGetUserInfoOnInitialRender": true,
            "screenSet": "Default-RegistrationLogin",
            "context": "{testField: 'testContext'}",
            "startScreen": "gigya-register-screen",
            "source": "showScreenSet",
            "pluginsStack": [
                {
                    "source": "showScreenSet"
                }
            ],
            "lastSource": "showScreenSet",
            "_reportedLoad": true,
            "deviceType": "auto",
            "customLang": {},
            "isChild": false,
            "tabIndex": "0",
            "version": "2",
            "enabledProviders": "facebook,googleplus,twitter,linkedin,amazon,yahoo",
            "loginMode": "standard",
            "buttonsStyle": "fullLogoColored",
            "buttonSize": 45,
            "columns": "",
            "showWhatsThis": "false",
            "showTermsLink": false,
            "hideGigyaLink": "true",
            "_pluginCenterFix": "true",
            "originalMethodName": "showLoginUI",
            "accountsSocialLogin": true,
            "finalizeRegistration": true,
            "dontHandleScreenSet": true,
            "include": "profile,data,emails,subscriptions,preferences",
            "isPopup": false,
            "responsiveWidth": false,
            "widthNum": 420,
            "heightNum": 100,
            "lastLoginIndication": "border",
            "provider": "facebook"
        },
        "context": "{testField: 'testContext'}",
        "operation": "/accounts.socialLogin"
    }
};

export const expAfterSubmitSocialOnError = {
    "eventName": "afterSubmit",
    "screen": "gigya-register-screen",
    "form": "div.gigya-social-login",
    "profile": {},
    "data": {},
    "preferences": {},
    "subscriptions": {},
    "response": {
        "callId": "mock-call-id",
        "errorCode": "500023",
        "regToken": "mock-reg-token",
        "status": "FAIL",
        "errorMessage": "",
        "statusMessage": "",
        "requestParams": {
            "connectWithoutLoginBehavior": "alwaysLogin",
            "defaultRegScreenSet": "Default-RegistrationLogin",
            "defaultMobileRegScreenSet": "Default-RegistrationLogin",
            "sessionExpiration": 0,
            "rememberSessionExpiration": 0,
            "lang": "en",
            "APIKey": "mock-api-key",
            "width": "420",
            "height": "100",
            "requiredCapabilities": "login",
            "pagingButtonStyle": "newArrows",
            "UIMode": "Login",
            "_callGetUserInfoOnInitialRender": true,
            "screenSet": "Default-RegistrationLogin",
            "startScreen": "gigya-register-screen",
            "source": "showScreenSet",
            "pluginsStack": [
                {
                    "source": "showScreenSet"
                }
            ],
            "lastSource": "showScreenSet",
            "_reportedLoad": true,
            "deviceType": "auto",
            "customLang": {},
            "isChild": false,
            "tabIndex": "0",
            "version": "2",
            "enabledProviders": "facebook,googleplus,twitter,linkedin,amazon,yahoo",
            "loginMode": "standard",
            "buttonsStyle": "fullLogoColored",
            "buttonSize": 45,
            "columns": "",
            "showWhatsThis": "false",
            "showTermsLink": false,
            "hideGigyaLink": "true",
            "_pluginCenterFix": "true",
            "originalMethodName": "showLoginUI",
            "accountsSocialLogin": true,
            "finalizeRegistration": true,
            "dontHandleScreenSet": true,
            "include": "profile,data,emails,subscriptions,preferences",
            "isPopup": false,
            "responsiveWidth": false,
            "widthNum": 420,
            "heightNum": 100,
            "lastLoginIndication": "border",
            "provider": "facebook"
        },
        "operation": "/accounts.socialLogin"
    },
    "context": "{testField: 'testContext'}",
    "source": "showScreenSet",
    "instanceID": "screenSet"
};

export const expOnErrorSocial = {
    eventName: "error",
    status: "FAIL",
    statusMessage: "General Server Error",
    errorMessage: "General Server Error",
    errorDetails: "screenSet",
    errorCode: "500023",
    response: {
        statusMessage: "General Server Error",
        errorMessage: "",
        errorCode: "500023",
        errorDetails: "screenSet",
        params: {
            screenSet: "Default-RegistrationLogin",
            connectWithoutLoginBehavior: "alwaysLogin",
            defaultRegScreenSet: "Default-RegistrationLogin",
            defaultMobileRegScreenSet: "Default-RegistrationLogin",
            sessionExpiration: 0,
            rememberSessionExpiration: 0,
            lang: "en",
            APIKey: "mock-api-key",
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
            regToken: "mock-reg-token",
            isChild: false
        },
        info: {
            screen: "gigya-register-screen",
            form: "gigya-register-form",
            response: {
                eventName: "error",
                status: "FAIL",
                statusMessage: "General Server Error",
                errorMessage: "General Server Error",
                errorDetails: "",
                errorCode: "500023",
                response: {
                    callId: "mock-call-id",
                    errorCode: "500023",
                    regToken: "mock-reg-token",
                    status: "FAIL",
                    errorMessage: "",
                    statusMessage: "",
                    requestParams: {
                        connectWithoutLoginBehavior: "alwaysLogin",
                        defaultRegScreenSet: "Default-RegistrationLogin",
                        defaultMobileRegScreenSet: "Default-RegistrationLogin",
                        sessionExpiration: 0,
                        rememberSessionExpiration: 0,
                        lang: "en",
                        APIKey: "mock-api-key",
                        width: "420",
                        height: "100",
                        requiredCapabilities: "login",
                        pagingButtonStyle: "newArrows",
                        UIMode: "Login",
                        _callGetUserInfoOnInitialRender: true,
                        screenSet: "Default-RegistrationLogin",
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
                        isChild: false,
                        tabIndex: "0",
                        version: "2",
                        enabledProviders: "facebook,googleplus,twitter,linkedin,amazon,yahoo",
                        loginMode: "standard",
                        buttonsStyle: "fullLogoColored",
                        buttonSize: 45,
                        columns: "",
                        showWhatsThis: "false",
                        showTermsLink: false,
                        hideGigyaLink: "true",
                        _pluginCenterFix: "true",
                        originalMethodName: "showLoginUI",
                        accountsSocialLogin: true,
                        finalizeRegistration: true,
                        dontHandleScreenSet: true,
                        include: "profile,data,emails,subscriptions,preferences",
                        isPopup: false,
                        responsiveWidth: false,
                        widthNum: 420,
                        heightNum: 100,
                        lastLoginIndication: "border",
                        provider: "facebook"
                    },
                    operation: "/accounts.socialLogin"
                },
                context: "{testField: 'testContext'}",
                source: "showScreenSet"
            }
        }
    },
    context: "{testField: 'testContext'}",
    source: "showScreenSet",
    instanceID: "screenSet"
}

