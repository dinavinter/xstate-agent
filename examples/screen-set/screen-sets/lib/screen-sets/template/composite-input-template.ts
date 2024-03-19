import {InputData, InputElement, InputTemplate} from "./input-template";
import {CompositeInputType, ControlAttributes, ControlTemplate, ControlType} from "./control-template";

export class CompositeInputTemplate extends InputTemplate {
    protected inputs: InputElement[];

    constructor(protected wrapper: HTMLElement) {
        super(wrapper);
        this.inputs = Array.from(this.inputRef.querySelectorAll('input,select'));
    }

    public static createTemplate(type: ControlType | InputData) {
        const props = CompositeInputProperties.get(<CompositeInputType>type);
        if(!props) {
            throw new Error(`Unsupported input type: ${CompositeInputType[<CompositeInputType>type]}`);
        }
        if(props.template) {
            return new DOMParser().parseFromString(props.template, "text/xml").firstChild as HTMLDivElement;
        }
        const wrapperElement = document.createElement('div');
        wrapperElement.className = `gigya-composite-control gigya-composite-control-${props.type}`;
        if(props.inputs && props.inputs.length) {
            props.inputs.forEach(inputData => {
                const inputEl = <InputElement>document.createElement(inputData.tagName);
                if(inputData.type) {
                    inputEl.setAttribute('type', inputData.type);
                }
                wrapperElement.appendChild(inputEl);
            });
        }
        return wrapperElement;
    }

    protected getRef(): HTMLElement {
        const fieldset = this.ref.querySelector('fieldset');
        return fieldset || this.ref;
    }
}

export interface CompositeInputData {
    type: 'phone-number';
    template?: string;
    inputs?: InputData[];
}

export const CompositeInputProperties = new Map<CompositeInputType, CompositeInputData>();

CompositeInputProperties.set(CompositeInputType.PhoneNumber, {
    type: 'phone-number',
    template: require(`../../../mocks/screen-sets/inputs/phone-number.html`)
});
