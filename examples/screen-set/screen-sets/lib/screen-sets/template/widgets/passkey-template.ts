import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';
import {PasskeySelectors} from '../../instance/widgets/passkey';

const TEMPLATE = require(`../../../../mocks/screen-sets/widgets/passkey.html`);

export class PasskeyLoginTemplate extends WidgetTemplate {
    constructor(protected ref: HTMLElement) {
        super(ref);
        this.wrapper = ref.querySelector(PasskeySelectors.selector);
    }

    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        const el = new DOMParser().parseFromString(TEMPLATE, "text/xml").firstChild as HTMLDivElement;
        el.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);
        el.classList.add(PasskeySelectors.loginClass)
        el.querySelector(PasskeySelectors.labelSelector).textContent = 'Login with passkey';
        return el;
    }
}

export class PasskeyRegisterTemplate extends WidgetTemplate {
    constructor(protected ref: HTMLElement) {
        super(ref);
        this.wrapper = ref.querySelector(PasskeySelectors.selector);
    }

    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        const el = new DOMParser().parseFromString(TEMPLATE, "text/xml").firstChild as HTMLDivElement;
        el.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);
        el.classList.add(PasskeySelectors.registerClass);
        el.querySelector(PasskeySelectors.labelSelector).textContent = 'Register passkey';
        return el;
    }
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.PasskeyLogin, PasskeyLoginTemplate);
WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.PasskeyRegister, PasskeyRegisterTemplate);
