import {registerCustomEventWithTimeout} from "./custom-events";
import {fromPlugin, isLoadEvent} from "./utils";
import { BasePlugin, PluginSelectors, PluginSource } from "../lib/screen-sets/instance/plugins/base-plugin";
import { ScreenSetEvents } from "../lib/screen-sets/instance/screen-set-events";

export type PluginLoadSource = "showScreenSet" | "showLoginUI" | "showAddConnectionsUI_v2" | "showMyPhotoUI";

export async function getPlugin<T extends BasePlugin>(
    element: HTMLElement,
    plugin: PluginSource,
    source: PluginLoadSource,
    screenSetEvents?: ScreenSetEvents): Promise<T> {

    let pluginEl = getPluginContainer(element, plugin);
    if(!pluginEl || pluginEl.querySelectorAll('*').length < 2) {
        await waitForPlugin(source, plugin);
        pluginEl = getPluginContainer(element, plugin);
    }
    if (pluginEl){
        return BasePlugin.pluginFactory(plugin, pluginEl, screenSetEvents)
    }
}

export function getPluginContainer(element: HTMLElement, plugin: PluginSource): HTMLDivElement {
    return element.querySelector(PluginSelectors[plugin]) as HTMLDivElement;
}

export function waitForPlugin(source: PluginLoadSource, pluginId: string = ''): Promise<void> {
    return new Promise((resolve, reject) => {
        const criteria = e => {
            return isLoadEvent(e, source) && fromPlugin(e, pluginId);
        };
        registerCustomEventWithTimeout(criteria, resolve, reject, `loading ${pluginId}`);
    });
}
