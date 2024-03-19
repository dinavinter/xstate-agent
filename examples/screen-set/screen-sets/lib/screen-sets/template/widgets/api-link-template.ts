import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';

export const ApiLinkAttributes = {
    selector: '[data-gigya-api-link]',
    apiLink: 'data-gigya-api-link',
    translationKey: 'data-translation-key',
    disableOnRender: 'data-disable-on-render',
    disableTimeout: 'data-disable-timeout'
};

export class ApiLinkTemplate extends WidgetTemplate {

    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        const el = document.createElement('a');
        el.className = 'gigya-composite-control gigya-composite-control-link';
        el.setAttribute('data-binding', 'true');
        el.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);
        return el;
    }

    public get apiLink(): string {
        return this.ref.getAttribute(ApiLinkAttributes.apiLink);
    }

    public set apiLink(api: string) {
        this.ref.setAttribute(ApiLinkAttributes.apiLink, api);
    }

    public get disableOnRender(): boolean {
        const value = this.ref.getAttribute(ApiLinkAttributes.disableOnRender);
        return  value && value === 'true';
    }

    public set disableOnRender(value: boolean) {
        this.ref.setAttribute(ApiLinkAttributes.disableOnRender, `${value}`);
    }

    public get disableTimeout(): number {
        const value = this.ref.getAttribute(ApiLinkAttributes.disableTimeout);
        if (value) {
            return parseInt(value, 10) * 1000;
        }
        return null;
    }

    public set disableTimeout(value: number) {
        this.ref.setAttribute(ApiLinkAttributes.disableTimeout, `${value / 1000}`);
    }
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.ApiLink, ApiLinkTemplate);
