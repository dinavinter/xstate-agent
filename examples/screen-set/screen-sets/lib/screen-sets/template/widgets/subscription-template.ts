import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';
import {SubscriptionWidget} from '../../instance/widgets/subscription';

const TEMPLATE = require(`../../../../mocks/screen-sets/widgets/subscription.html`);

export class SubscriptionTemplate extends WidgetTemplate {
    constructor(protected ref: HTMLElement) {
        super(ref);
        this.wrapper = ref.querySelector(SubscriptionWidget.selector);
    }

    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        const el = new DOMParser().parseFromString(TEMPLATE, "text/xml").firstChild as HTMLDivElement;
        el.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);
        return el;
    }
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.Subscription, SubscriptionTemplate);
