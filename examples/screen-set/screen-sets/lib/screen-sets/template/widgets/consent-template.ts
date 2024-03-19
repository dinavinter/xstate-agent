import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';
import {ConsentWidget} from '../../instance/widgets/consent';

const TEMPLATE = require(`../../../../mocks/screen-sets/widgets/consent.html`);

export const ConsentAttributes = {
    ApprovedOnLabel: 'data-approved-on-label'
};

export class ConsentWidgetTemplate extends WidgetTemplate {
    constructor(protected ref: HTMLElement) {
        super(ref);
        this.wrapper = ref.querySelector(ConsentWidget.selector);
    }

    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        const el = new DOMParser().parseFromString(TEMPLATE, "text/xml").firstChild as HTMLDivElement;
        el.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);
        return el;
    }
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.Consent, ConsentWidgetTemplate);
