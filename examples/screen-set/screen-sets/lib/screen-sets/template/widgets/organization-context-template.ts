import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';
import {OrganizationContextWidget} from "../../instance/widgets/organization-context";

const TEMPLATE = require(`../../../../mocks/screen-sets/widgets/organization-context.html`);

export class OrganizationContextTemplate extends WidgetTemplate {
    constructor(protected ref: HTMLElement) {
        super(ref);
        this.wrapper = ref.querySelector(OrganizationContextWidget.selector);
    }

    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        const el = new DOMParser().parseFromString(TEMPLATE, "text/xml").firstChild as HTMLDivElement;
        el.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);
        return el;
    }
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.OrganizationContext, OrganizationContextTemplate);
