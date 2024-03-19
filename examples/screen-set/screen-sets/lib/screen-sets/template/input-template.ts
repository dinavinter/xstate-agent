import {ControlTemplate, ControlType, InputType} from "./control-template";

const InputAttributes = {
    Condition: 'data-condition',
    KeepVisible: 'data-on-render',
    Bounded: 'data-bound-to',

    ArrayKeyField: 'data-array-key-field',
    ArrayKeyValue: 'data-array-key-value',
    ArrayKeyRoot: 'data-array-root'
};

export class InputTemplate extends ControlTemplate {
    protected inputRef: InputElement;

    constructor(protected wrapper: HTMLElement) {
        super(wrapper);
        this.inputRef = <InputElement>wrapper.querySelector('input,select,fieldset');
    }

    public withLabel(text: string): InputTemplate {
        let label = <HTMLLabelElement>this.wrapper.querySelector(`label.gigya-label[for="${this.inputRef.id}"]`);
        if (!label) {
            label = document.createElement('label') as HTMLLabelElement;
            label.className = 'gigya-label';
            label.setAttribute('for', this.inputRef.id);

            this.wrapper.insertBefore(label, this.wrapper.firstChild);


        }
        let span = <HTMLSpanElement>label.querySelector('span.gigya-label-text');
        if (!span) {
            span = document.createElement('span');
            span.className = 'gigya-label-text';
            span.setAttribute('data-binding', 'true');
            label.appendChild(span);
            let asteriskLabel = this.buildAsteriskLabel();
            label.appendChild(asteriskLabel);
        }
        span.innerHTML = text;
        return this;
    }

    private buildAsteriskLabel() {
        let asteriskLabel: HTMLLabelElement = document.createElement('label');
        asteriskLabel.className = 'gigya-required-display gigya-conditional gigya-reset';
        asteriskLabel.setAttribute('for', this.inputRef.id);
        asteriskLabel.innerHTML = '*';
        asteriskLabel.setAttribute(InputAttributes.Bounded, this.name);
        return asteriskLabel;
    }

    public mapTo(name: string): InputTemplate {
        this.inputRef.setAttribute('name', name);
        this.bindErrorElement();
        return this;
    }

    public addMetadata(key: string, value: string) {
        key = key?.startsWith('data-') ? key : `data-${key}`;
        this.inputRef.setAttribute(key, value);
        return this;
    }

    public getMetadata(key: string): string {
        key = key?.startsWith('data-') ? key : `data-${key}`;
        return this.inputRef.getAttribute(key) ?? '';
    }

    public storeInArray(arrayKeyField: string, arrayKeyValue: string): InputTemplate {
        if (!this.name) return;
        const arrayRoot = this.name.substr(0, this.name.lastIndexOf('.'));
        this.addMetadata(InputAttributes.ArrayKeyRoot, arrayRoot);
        this.addMetadata(InputAttributes.ArrayKeyField, arrayKeyField);
        this.addMetadata(InputAttributes.ArrayKeyValue, arrayKeyValue);
        this.bindErrorElement(arrayKeyValue);
        return this;
    }

    public addAttribute(attributeName: string, value: string) {
        this.inputRef.setAttribute(attributeName, value);
        return this;
    }

    public bindErrorElement(arrayKeyValue?: string) {
        const errorWrapper = this.wrapper.querySelector('.gigya-error-msg');
        if (!errorWrapper) return;
        errorWrapper.setAttribute(InputAttributes.Bounded, this.name);
        if (arrayKeyValue) {
            errorWrapper.setAttribute(InputAttributes.ArrayKeyValue, arrayKeyValue);
        }
        return this;
    }

    public predefinedValue(value: string): InputTemplate {
        this.inputRef.setAttribute('value', value);
        return this;
    }

    public expressionAttribute(attrName: string, expression: string): InputTemplate {
        if (this.inputRef.getAttribute(attrName)) {
            this.inputRef.removeAttribute(attrName);
        }
        this.inputRef.setAttribute(`gigya-expression:${attrName}`, expression);
        return this;
    }

    public get name() {
        return this.inputRef.getAttribute('name');
    }

    public get inputId() {
        return this.inputRef.id;
    }

    public get arrayKeyField() {
        return this.getMetadata(InputAttributes.ArrayKeyField);
    }

    public get arrayKeyValue() {
        return this.getMetadata(InputAttributes.ArrayKeyValue);
    }

    public static createTemplate(props: InputData): HTMLElement;
    public static createTemplate(type: ControlType): HTMLElement;
    public static createTemplate(data: ControlType | InputData): HTMLElement {
        let props = <InputData>data;
        if (!props.tagName) {
            props = InputProperties.get(<InputType>data);
            if (!props) {
                throw new Error(`Unsupported input type: ${InputType[<InputType>data]}`);
            }
        }
        const wrapperElement = document.createElement('div');
        wrapperElement.className = `gigya-composite-control gigya-composite-control-${props.toolboxKind || props.tagName}`;
        const inputRef = <InputElement>document.createElement(props.tagName);
        wrapperElement.appendChild(inputRef);
        inputRef.id = `gigya-input-${props.type || props.toolboxKind}-${InputTemplate.generateID}`;
        if (props.type) {
            inputRef.setAttribute('type', props.type);
            inputRef.className = props.className || `gigya-input-${props.type}`;
        }
        if (props.type !== 'hidden') {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'gigya-error-msg';
            wrapperElement.appendChild(errorSpan);
        }

        return wrapperElement;
    }

    public createTypeAheadTemplateForTextBox() {
        const container = document.createElement("div");
        container.className = "gigya-combo-container";
        container.innerHTML = `
    <div class="gigya-combo-input-clear"></div>
    <div class="gigya-combo-popup">
        <div class="gigya-combo-spinner"></div>
        <div class="gigya-combo-list">
            <div class="gigya-combo-option-disabled">There are no results for the current location. Please check for any spelling errors.</div>
        </div>
    </div>`;
        this.inputRef.insertAdjacentElement("beforebegin", container);
    }
}


export type InputElement = HTMLInputElement | HTMLSelectElement;

export interface InputData {
    toolboxKind?: 'textbox' | 'dropdown' | 'checkbox' | 'metadata'
    tagName: 'input' | 'select'
    className?: string
    type?: 'text' | 'checkbox' | 'dropdown' | 'hidden' | 'submit' | 'radio' | 'password'
}

export const InputProperties = new Map<InputType, InputData>();

InputProperties.set(InputType.TextBox, {tagName: 'input', type: 'text', toolboxKind: 'textbox'});
InputProperties.set(InputType.Password, {tagName: 'input', type: 'password', toolboxKind: 'textbox'});
InputProperties.set(InputType.Metadata, {
    tagName: 'input',
    type: 'hidden',
    toolboxKind: 'metadata',
    className: 'gigya-metadata'
});
InputProperties.set(InputType.CheckBox, {tagName: 'input', type: 'checkbox'});
InputProperties.set(InputType.Submit, {tagName: 'input', type: 'submit'});
InputProperties.set(InputType.DropDown, {tagName: 'select', toolboxKind: 'dropdown'});
InputProperties.set(InputType.Radio, {tagName: 'input', type: 'radio'});
