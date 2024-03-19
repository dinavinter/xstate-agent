import {IApiServiceInitInfo, IBootstrapConfigOverrides, ISDKConfig, ServiceProxyInitFunc} from "../gigya-interfaces";
import {cloneDeep, merge} from 'lodash';
import {config} from '../../functional.config';
import {ApiMockFactory} from '../../mocks/api/mock-factory';
import mockBackend, {whenFetch} from "../../lib/api/mock-backend";
import {ServerEndpoint} from "../../lib/api/endpoints";

const global = window as Window & any;
const {gigyaConf, injectionData} = config;

const defaultServiceProxyInitOverride: ServiceProxyInitFunc = () => {
    return Promise.resolve<IApiServiceInitInfo>({
        hasGroupApiDomainChanged: false,
        isGroupApiDomain: false,
        apiDomain: `${injectionData.dataCenter}.${injectionData.defaultApiDomain}`
    });
};

export interface IConsentStatusResponse {
    consentStatus: {
        isMigrated: boolean;
    }
}

export function webSDKBootstrap(bootstrapConfigOverrides: IBootstrapConfigOverrides = {}): Promise<void> {

    // override the default webSdkConfig
    const effectiveInjectionData = merge(cloneDeep(injectionData), bootstrapConfigOverrides.injectionData || {});
    const effectiveGlobalConf = merge(cloneDeep(gigyaConf), bootstrapConfigOverrides.globalConf || {});

    gigya.legacyReports.init =
        gigya.legacyReports.report =
            gigya.socialize.trackReferrals =
                gigya.gscounters.sendReport = () => {};

    __gigyaConf = effectiveGlobalConf;
    Object.keys(effectiveInjectionData).forEach(key => {
        gigya[key] = effectiveInjectionData[key];
    });

    // false means that we would like to actually load the Api.aspx frame
    if (bootstrapConfigOverrides.serviceProxyInit !== false) {
        spyOn(gigya.services.proxy.ServiceProxy.prototype, 'init')
            .and.callFake(bootstrapConfigOverrides.serviceProxyInit || defaultServiceProxyInitOverride);
    }

    gigya.bootstrap();

    return new Promise<void>(resolve => {
        global.onGigyaServiceReady = resolve;
    });
}

export function setUpWebSdkBootstrap(res = ApiMockFactory.createResponse()) {
    mockBackend.when(ServerEndpoint.WebSdkBootstrap).returnResponse(res);
}

export function setUpGetSDKConfig(config: Partial<ISDKConfig> = ApiMockFactory.createResponse()) {
    // mockBackend.when(ServerEndpoint.WebSdkBootstrap).returnResponse(res);
    whenFetch(/sdk\.config\.get(?!ConsentStatus)/,
        merge({
            flags: {
                activeFlag: true, disableFlag: false
            }, api: {}, sso: {}, plugins: {}},
            { ...config, hasConsentLicense: true }
        ));
}



