

export type Endpoint = ServerEndpoint | SSOFrameEndpoint | BootstrapAPIs | string;
export enum ServerEndpoint {
    InitRegistration = "accounts.initRegistration",
    Login = "accounts.login",
    SocialLogin = "accounts.socialLogin",
    AuthLogin = "accounts.auth.login",
    AuthGetMethods = "accounts.auth.getMethods",
    AuthPushSendVerification = "accounts.auth.push.sendVerification",
    AuthMagicLinkEmailSend = "accounts.auth.magiclink.email.send",
    AuthPushIsVerified = "accounts.auth.push.isVerified",
    Register = "accounts.register",
    FinalizeRegistration = "accounts.finalizeRegistration",
    IsAvailableLoginID = "accounts.isAvailableLoginID",
    GetAccountInfo = "accounts.getAccountInfo",
    SetAccountInfo = "accounts.setAccountInfo",
    OtpSendCode = "accounts.otp.sendCode",
    OtpLogin = "accounts.otp.login",
    OtpUpdate = "accounts.otp.update",
    OtpAuthenticate = "accounts.auth.otp.authenticate",
    GetConflictingAccount = "accounts.getConflictingAccount",
    GetPolicies = "accounts.getPolicies",
    GetSchema = "accounts.getSchema",
    GetScreenSets = "accounts.getScreenSets",
    TfaGetProviders = "accounts.tfa.getProviders",
    TfaGetRegisteredPhones = "accounts.tfa.phone.getRegisteredPhoneNumbers",
    TfaTotpRegister = "accounts.tfa.totp.register",
    TfaTotpVerify = "accounts.tfa.totp.verify",
    TfaBackupCodesGet = "accounts.tfa.backupcodes.get",
    TfaBackupCodesCreate = "accounts.tfa.backupcodes.create",
    TfaBackupCodesVerify = "accounts.tfa.backupcodes.verify",
    TfaInitTFA = "accounts.tfa.initTFA",
    TfaFinalizeTFA = "accounts.tfa.finalizeTFA",
    TfaEmailGetRegisterEmails = "accounts.tfa.email.getEmails",
    TfaPhoneSendCode = "accounts.tfa.phone.sendVerificationCode",
    TfaEmailSendCode = "accounts.tfa.email.sendVerificationCode",
    TfaPushSendVerification = "accounts.tfa.push.sendVerification",
    TfaPhoneCompleteVerification="accounts.tfa.phone.completeVerification",
    TfaEmailCompleteVerification = "accounts.tfa.email.completeVerification",
    TfaPushIsVerified = "accounts.tfa.push.isVerified",
    GetUserInfo = "socialize.getUserInfo",
    SocializeLogin = "socialize.login",
    VerifyLogin = "accounts.verifyLogin",
    AddConnection = "socialize.addConnection",
    InitProgression = "accounts.initProgression",
    WebSdkBootstrap = "accounts.webSdkBootstrap",
    MagicLinkLogin = "accounts.auth.magiclink.email.login",
    EmailOTPCodeSend = "accounts.auth.otp.email.sendCode",
    EmailOTPLogin = "accounts.auth.otp.email.login",
    CreateAToken = "accounts.identifier.createToken",
    ResetPassword = "accounts.resetPassword",
    SDKErrorReport = "sdk.errorReport",
    NotifySocialLogin = "accounts.notifySocialLogin",
    GroupConfirmInvitation = "accounts.groups.invitationConfirm",
    GroupFinalizeInvitation = "accounts.groups.finalizeInvitation",
    DeviceRegister = "oidc/op/v1.0/{APIKey}/device_continue",
    SiteConsentDetails = "accounts.getSiteConsentDetails",
    FidoGetAssertionOption = "accounts.auth.fido.getAssertionOptions",
    FidoVerifyAssertion = "accounts.auth.fido.verifyAssertion",
    OauthAuthorize = "oauth.authorize",
    OauthRegister = "oauth.register",
    OauthToken = "oauth.token",
    FidoInitRegistrationCredentials = "accounts.auth.fido.initRegisterCredentials",
    FidoRegisterCredentials = "accounts.auth.fido.registerCredentials",
    FidoGetCredentials = 'accounts.auth.fido.getCredentials',
    FidoRemoveCredential = 'accounts.auth.fido.removeCredential',
    OauthConnect = "oauth.connect",
    DQMGetSuggestions = "accounts.address.suggestions.get",
    GetOrganizationContext = 'accounts.b2b.getOrganizationContext',
    SetOrganizationContext = 'accounts.b2b.setOrganizationContext',
    IdentityAuthorize = 'accounts.identity.authorize'
}
export enum SSOFrameEndpoint {
    GetToken = "getToken",
    GetLoginTokenExp = "getLoginTokenExp",
    CheckTokenRenew = "checkTokenRenew",
    Logout = "logout",
    RemoveToken = "removeToken",
    SetToken = "setToken",
    SetLoginTokenExp = "setLoginTokenExp",
    SyncCanaryIndication = "syncCanaryIndication",
}
export enum FlowBuilderEndpoint {
    Dispatch = 'workflow/runtime/v1/workflowDefinitions/{flowId}/dispatch',
    Execute = '/runtime/v1/workflowDefinitions/{flowId}/instances/{instanceId}/activities/{activityId}:activity-2/execute'
}

export enum BootstrapAPIs {
    GetSSOContext = 'accounts.sso.getContext',
    GetConsentStatus = 'sdk.getConsentStatus',
    GetOidcSSOContext = 'sso/getContext',
    GetSDKConfig = `/sdk.config.get(?!ConsentStatus)/`
}
