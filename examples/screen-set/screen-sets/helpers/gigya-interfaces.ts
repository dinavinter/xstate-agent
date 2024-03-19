export interface IGigyaInjectionData {
    dataCenter: string;
    env: string;
    defaultApiDomain: string;
    partnerSettings: Partial<{
        authMode: string;
        baseDomains: string;
        captchaProvider: string;
        plugins: {
            connectWithoutLoginBehavior: string;
            defaultRegScreenSet: string;
            defaultMobileRegScreenSet: string;
            sessionExpiration: number;
            rememberSessionExpiration: number;
            apiDomain: string;
        },
        ssoKey: string;
        ssoSegment: string;
    }>,
    canary: {
        isActive: boolean;
        config: {
            isEnabled: boolean;
            probability: number;
            cookiesNames: {
                isCanary: string;
                version: string;
            }
        }
    }
}

export interface IGlobalConf {
    debounceDelay: number;
    storageDomainOverride: string;
    toggles: {[key:string]: boolean};
    include: string;
    lang: string;
    authFlow: string;
}

export interface IGroupApiDomainInfo {
    isGroupApiDomain: boolean;
    hasGroupApiDomainChanged: boolean;
}

export interface IApiServiceInitInfo extends IGroupApiDomainInfo {
    apiDomain: string;
}

export interface IApiServiceInitError {
    errorCode: number
}

export type ServiceProxyInitFunc = () => Promise<IApiServiceInitInfo | IApiServiceInitError>;

export interface IBootstrapConfigOverrides {
    serviceProxyInit?: ServiceProxyInitFunc | false;
    injectionData?: Partial<IGigyaInjectionData>;
    globalConf?: Partial<IGlobalConf>;
}


export interface ISDKPluginConfig {
    connectWithoutLoginBehavior?: string;
    defaultRegScreenSet?: string;
    defaultMobileRegScreenSet?: string;
    sessionExpiration?: number;
    rememberSessionExpiration?: number;
    apiDomain?: string;
    workflowPlugin?: string;
}

export interface ISDKConfig {
    flags: {[key:string]: boolean};
    plugins: ISDKPluginConfig;
    api: {};
    sso: {};
    hasConsentLicense: boolean
}
