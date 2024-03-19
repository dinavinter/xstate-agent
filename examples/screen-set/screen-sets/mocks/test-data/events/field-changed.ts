export const expFieldChangePhoneNumber = {
    eventName: "fieldChanged",
    screen: "gigya-mobile-login-screen",
    form: "gigya-otp-send-code-form",
    field: "phoneNumber",
    isValid: true,
    errMsg: 0,
    value: "+972545555555",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};
export const expFieldChangePhoneNumberWithErrorRequired = {
    eventName: "fieldChanged",
    screen: "gigya-mobile-login-screen",
    form: "gigya-otp-send-code-form",
    field: "phoneNumber",
    isValid: false,
    errMsg: 400027, // required - REQUIRED_VALUE_VALIDATION_ERROR
    value: "+972",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};
export const expFieldChangePhoneNumberWithErrorInvalid_Characters = {
    eventName: "fieldChanged",
    screen: "gigya-mobile-login-screen",
    form: "gigya-otp-send-code-form",
    field: "phoneNumber",
    isValid: false,
    errMsg: 400006, // invalid - INVALID_PARAMETER_VALUE
    value: "+972a45555555",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};
export const expFieldChangePhoneNumberWithErrorInvalid_TooLong = {
    eventName: "fieldChanged",
    screen: "gigya-mobile-login-screen",
    form: "gigya-otp-send-code-form",
    field: "phoneNumber",
    isValid: false,
    errMsg: 400006, // invalid - INVALID_PARAMETER_VALUE
    value: "+9725445454545455555555",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};

export const expFieldChangeEmail = {
    eventName: "fieldChanged",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    field: "email",
    isValid: true,
    errMsg: 0,
    value: "some@email.com",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};
export const expFieldChangeFirstName = {
    eventName: "fieldChanged",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    field: "profile.firstName",
    isValid: true,
    errMsg: 0,
    value: "first",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};
export const expFieldChangeLastName = {
    eventName: "fieldChanged",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    field: "profile.lastName",
    isValid: true,
    errMsg: 0,
    value: "last",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};

export const expFieldChangePassword = {
    eventName: "fieldChanged",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    field: "password",
    isValid: true,
    errMsg: 0,
    value: "password",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};

export const expFieldChangePasswordRetype = {
    eventName: "fieldChanged",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    field: "passwordRetype",
    isValid: true,
    errMsg: 0,
    value: "password",
    source: "showScreenSet"
};

export const expFieldChangeEmailWithError = {
    eventName: "fieldChanged",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    field: "email",
    isValid: false,
    errMsg: 400006,
    value: "invalidemail.com",
    context: "{testField: 'testContext'}",
    source: "showScreenSet",
};

export const expFieldChangeWithErrorEmailExist = {
    eventName: "fieldChanged",
    screen: "gigya-register-screen",
    form: "gigya-register-form",
    field: "email",
    isValid: false,
    errMsg: 400003,
    value: "some@email.com",
    context: "{testField: 'testContext'}",
    source: "showScreenSet"
};
