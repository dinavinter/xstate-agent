import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';
import {CommunicationWidget} from "../../instance/widgets/communication";

const TEMPLATE = require(`../../../../mocks/screen-sets/widgets/communication.html`);

export class CommunicationTemplate extends WidgetTemplate {
    constructor(protected ref: HTMLElement) {
        super(ref);
        this.wrapper = ref.querySelector(CommunicationWidget.selector);
    }

    public static getTemplate(uniqueIdentifier?: string): HTMLElement {
        const el = new DOMParser().parseFromString(TEMPLATE, "text/xml").firstChild as HTMLDivElement;
        el.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);
        return el;
    }
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.Communication, CommunicationTemplate);
