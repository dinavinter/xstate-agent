import {ScreenSetEvents} from "../screen-set-events";

export enum PluginSource {
    SocialLoginWidget = 'social',
    ShowAddConnectionsUI_v2 = 'showAddConnectionsUI_v2',
    ShowLoginUI = 'showLoginUI',
    ShowTFAUI = 'showTfaUI',
    ShowMyPhotoUI = 'showMyPhotoUI'
}

export const PluginSelectors = {
    [PluginSource.SocialLoginWidget]: '.gigya-social-login',
    [PluginSource.ShowAddConnectionsUI_v2]: '#gigya-modal-plugin-container-showAddConnectionsUI_v2',
    [PluginSource.ShowLoginUI]: '[gigid="showLoginUI_showLoginUI_v1"]',
    [PluginSource.ShowTFAUI]: '.gigya-tfa',
    [PluginSource.ShowMyPhotoUI]: '.gigya-myPhoto'
};

export class BasePlugin {

    constructor(protected ref: HTMLDivElement, protected screenSetEvents: ScreenSetEvents) {    }

    private static _registry = {};

    public static pluginFactory(plugin: PluginSource, ref: HTMLDivElement, screenSetEvents?: ScreenSetEvents) {
        if(!BasePlugin._registry[plugin]) {
            throw new Error(`Can't find plugin ${plugin} in registry`);
        }
        return new BasePlugin._registry[plugin](ref, screenSetEvents);
    }

    public static registerPlugin(pluginType: PluginSource, pluginClass: typeof BasePlugin) {
        BasePlugin._registry[pluginType] = pluginClass;
    }

    public getElement<T extends Element>(selector: string): T {
        return <T>this.ref.querySelector(selector);
    }
}
