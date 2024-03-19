import {GigyaForm} from "./form";
import {ScreenSetEvents} from "./screen-set-events";
import {ControlAttributes, WidgetType} from '../template/control-template';
import {BasePlugin, PluginSource} from "./plugins/base-plugin";
import {getPlugin, PluginLoadSource} from '../../../helpers/plugins';
import {SocialProvider} from "../template/screen-template";
import {SocialLoginPlugin} from "./plugins/social-login";
import {GigyaWidget, IWidgetType} from './widget';
import {IWidgetTemplate} from '../template/widget-template';

type Constructor<T> = new (...args: any[]) => T;

export class GigyaScreen {

    private readonly _form: GigyaForm;
    protected _nativeElement: HTMLDivElement;
    private _innerPlugins: {[pluginId: string]: BasePlugin} = {};
    private _widgets: GigyaWidget[];


    constructor(private _id: string, private screenSetEvents: ScreenSetEvents) {
        this._nativeElement = <HTMLDivElement>document.querySelector(`#${_id}`);
        const form = <HTMLFormElement>this._nativeElement.querySelector(`form`);
        if(form) {
            this._form = new GigyaForm(form, screenSetEvents);
        }

        this._widgets = GigyaWidget.registerWidgets(this._nativeElement, screenSetEvents);
    }

    public get nativeElement(): HTMLElement {
        return this._nativeElement;
    }

    public get form(): GigyaForm {
        return this._form;
    }

    public get id(): string {
        return this._id;
    }

    public get height(): number {
        return this._nativeElement.offsetHeight;
    }

    public get width(): number {
        return this._nativeElement.offsetWidth;
    }
    public get errorMessage(): string {
        return this._form?.errorMessage || '';
    }

    public getByTemplateIdentifier(identifier: string): HTMLElement {
        return this._nativeElement.querySelector(`[${ControlAttributes.UniqueReference}="${identifier}"]`);
    }

    public submit(fields: {} = {}): Promise<boolean> {
        return this._form?.submit(fields) || Promise.resolve(false);
    }

    public clickOn(uniqueIdentifier: string) {
        const el = this.getByTemplateIdentifier(uniqueIdentifier);
        if(el) {
            el.click();
        } else {
            throw new Error(`Can't find link ${uniqueIdentifier}`);
        }
    }

    public async socialLogin(provider: SocialProvider | string): Promise<boolean> {
        const socialLoginPlugin = await this.innerPlugin<SocialLoginPlugin>(PluginSource.SocialLoginWidget);
        return await socialLoginPlugin.loginWithProvider(`span[data-gigya-provider="${provider}"]`);
    }

    public async innerPlugin<T extends BasePlugin>(pluginType: PluginSource, source: string = 'showScreenSet'): Promise<T> {
        const plugin = await getPlugin(this._nativeElement, pluginType, source as PluginLoadSource, this.screenSetEvents);
        if(!plugin) {
            throw new Error(`Can't find plugin ${pluginType} on screen`);
        }
        this._innerPlugins[pluginType] = plugin;
        return this._innerPlugins[pluginType] as T;
    }

    public getWidget<T extends GigyaWidget>(type: Constructor<T>): T {
        return this.getWidgets(type)[0] as T || null;
    }

    public getWidgets<T extends GigyaWidget>(type: Constructor<T>): T[] {
        let widgets = this._widgets
            .filter(w => w instanceof type)
            .filter(w => Boolean(w)) as T[];

        if (!widgets?.length) {
            this._widgets = [...this._widgets, ...this.registerDynamicWidgets()];
        }

        widgets = this._widgets
          .filter(w => w instanceof type)
          .filter(w => Boolean(w)) as T[];

        return widgets;
    }

    public getWidgetByType<T extends GigyaWidget>(widgetType, index = 0): T {
        return this.getWidgetsByType(widgetType)[index] as T;
    }

    public getWidgetsByType<T extends GigyaWidget>(widgetType): T[] {
        return this._widgets
          .filter(w => w instanceof widgetType) as T[];
    }

    public registerDynamicWidgets() {
        return GigyaWidget.registerWidgets(this._nativeElement, this.screenSetEvents);

    }
}
