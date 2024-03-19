import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';

const tfaVerificationTemplate = require(`../../../../mocks/screen-sets/widgets/tfa-verification.html`);

export const tfaVerificationAttributes = {
    selector: '[data-gigya-api-link]',
    apiLink: 'data-gigya-api-link',
    translationKey: 'data-translation-key',
    disableOnRender: 'data-disable-on-render',
    disableTimeout: 'data-disable-timeout'
};

export class TfaVerificationTemplate extends WidgetTemplate {
    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        return createTemplateElement(tfaVerificationTemplate, uniqueIdentifier);
    }
}


function createTemplateElement(template: string, uniqueIdentifier: string): HTMLElement {
    const templateEl = document.createElement('template');
    templateEl.innerHTML = template;
    templateEl.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);

    return templateEl.content.firstChild as HTMLElement;
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.TfaVerification, TfaVerificationTemplate);




