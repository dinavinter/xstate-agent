import {ControlAttributes, ControlTemplate, WidgetType} from './control-template';

export type IWidgetTemplate = (new(...args) => WidgetTemplate) & {
    getTemplate(uniqueIdentifier?: string, params?: object): HTMLElement;
};

export class WidgetTemplate extends ControlTemplate {
    protected wrapper: HTMLElement;
    private static TemplateLibrary = new Map<WidgetType, IWidgetTemplate>();

    public get nativeElement(): HTMLElement {
        return this.ref;
    }

    public constructor(protected ref: HTMLElement) {
        super(ref);
    }

    public mapTo(name: string): WidgetTemplate {
        this.wrapper.setAttribute('name', name);
        return this;
    }

    public expressionAttribute(attrName: string, expression: string): WidgetTemplate {
        if (this.wrapper.getAttribute(attrName)) {
            this.wrapper.removeAttribute(attrName);
        }
        this.wrapper.setAttribute(`gigya-expression:${attrName}`, expression);
        return this;
    }

    public get name() {
        return this.wrapper.getAttribute('name');
    }

    public setAttribute(attrName: ControlAttributes, attrValue: string): ControlTemplate {
        this.wrapper.setAttribute(attrName, attrValue);
        return this;
    }

    public static addWidgetTemplateToLibrary(type: WidgetType, templateInstance: IWidgetTemplate) {
        this.TemplateLibrary.set(type, templateInstance);
    }

    public static createWidget<T extends WidgetTemplate>(type: WidgetType, uniqueIdentifier?: string): T {
        const Template = WidgetTemplate.TemplateLibrary.get(type);
        const identifier = uniqueIdentifier || `${type}_widget_${ControlTemplate.generateID}`;
        if (Template) {
            return new Template(Template.getTemplate(identifier)) as T;
        }
        return null;
    }
}

