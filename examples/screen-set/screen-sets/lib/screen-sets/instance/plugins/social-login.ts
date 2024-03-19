import {BasePlugin, PluginSource} from "./base-plugin";
import {IAfterSubmitEvent, IAfterValidationEvent, IErrorEvent} from "../../events.interface";
import {EventType} from "../screen-set-events";
import { registerCustomEventWithTimeout } from "../../../../helpers/custom-events";
import { fromPlugin, isAfterResponseEvent, isCloseEvent } from "../../../../helpers/utils";
import { PluginLoadSource } from "../../../../helpers/plugins";

export class SocialLoginPlugin extends BasePlugin {

    public loginWithProvider(selector: string, plugin?: PluginSource, source?: PluginLoadSource): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            if (this.screenSetEvents) {
                this.screenSetEvents.addHook<IAfterValidationEvent>(EventType.onAfterValidation,e => {
                    if(e.validationErrors) setTimeout( () => resolve(false), 0);
                });
                this.screenSetEvents.addHook<IAfterSubmitEvent>(EventType.onAfterSubmit,() =>
                    setTimeout( () => resolve(true), 0));
                this.screenSetEvents.addHook<IErrorEvent>(EventType.onError, () =>
                    setTimeout( () => resolve(false), 0));
            } else {
                const criteria = e => (isCloseEvent(e, plugin) || isAfterResponseEvent(e, plugin)) && fromPlugin(e, source);
                registerCustomEventWithTimeout(criteria, resolve, reject, `social login plugin closed`);
            }

            this.clickOnSocialLoginButton(selector);
        });
    }

    private clickOnSocialLoginButton(selector: string): void {
        this.getSocialLoginButton(selector).click();
    }

    private getSocialLoginButton(selector: string): HTMLButtonElement {
        return this.ref.querySelector(selector) as HTMLButtonElement;
    }
}

BasePlugin.registerPlugin(PluginSource.ShowAddConnectionsUI_v2, SocialLoginPlugin);
BasePlugin.registerPlugin(PluginSource.SocialLoginWidget, SocialLoginPlugin);
BasePlugin.registerPlugin(PluginSource.ShowLoginUI, SocialLoginPlugin);
