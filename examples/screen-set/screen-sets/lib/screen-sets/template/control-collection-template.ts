import {InputTemplate} from './input-template';
import {CompositeInputType, ControlTemplate, InputType, ViewControlType, WidgetType} from './control-template';
import {CompositeInputTemplate} from './composite-input-template';
import {ViewControlTemplate} from './view-control-template';
import {WidgetTemplate} from './widget-template';
import {PhoneInputTemplate} from './phone-input-template';

export class ControlCollectionTemplate {
    private _controls: ControlTemplate[];

    constructor(private _ref: HTMLDivElement | HTMLFormElement) {
        this._controls = Array.from(_ref.querySelectorAll('.gigya-composite-control'))
            .map((control: HTMLDivElement) => {
                if (control.tagName.toLowerCase() === 'input' || control.tagName.toLowerCase() === 'select') {
                    return new InputTemplate(control);
                }
                return new ControlTemplate(control);
            });
    }

    public getInput<T extends InputTemplate>(name: string, arrayKeyValue?: string): T {
        return <T>this._controls
            .map(i => i as T)
            .filter(i => Boolean(i.name))
            .filter(i => arrayKeyValue ? i.arrayKeyValue === arrayKeyValue : true)
            .find(i => i.name === name);
    }

    public addInput(type: InputType, wrapperId?: string): InputTemplate {
        const wrapper = <HTMLElement>InputTemplate.createTemplate(type);
        if (wrapperId) {
            const existingWrapper = this._ref.querySelector(`#${wrapperId}`);
            if (existingWrapper) {
                existingWrapper.appendChild(wrapper)
            }
        } else {
            this._insertElement(wrapper);
        }
        const input = new InputTemplate(wrapper);
        this._controls.push(input);
        return input;
    }

    public addViewControl(type: ViewControlType, uniqueIdentifier?: string): ViewControlTemplate {
        const wrapper = <HTMLDivElement>ControlTemplate.createTemplate(type, uniqueIdentifier || `${ViewControlType[type]}_${this._controls.length}`);
        this._insertElement(wrapper);
        const control = new ViewControlTemplate(wrapper);
        this._controls.push(control);
        return control;
    }

    public addCompositeInput(type: CompositeInputType): CompositeInputTemplate {
        const wrapper = <HTMLElement>CompositeInputTemplate.createTemplate(type);
        this._insertElement(wrapper);
        let compositeInput: CompositeInputTemplate;
        switch (type) {
            case CompositeInputType.PhoneNumber:
                compositeInput = new PhoneInputTemplate(wrapper);
                break;
            default:
                compositeInput = new CompositeInputTemplate(wrapper);

        }
        this._controls.push(compositeInput);
        return compositeInput;
    }

    public addWidget<T extends WidgetTemplate>(type: WidgetType, uniqueIdentifier?: string): T {
        const widget = WidgetTemplate.createWidget<T>(type, uniqueIdentifier);
        this._insertElement(widget.nativeElement);
        this._controls.push(widget);
        return widget;
    }

    public addMetadata(key: string, value: string) {
        key = key?.startsWith('data-') ? key: `data-${key}`;
        this._ref.setAttribute(key, value);
    }

    public clear(): ControlCollectionTemplate {
        while (this._ref.firstChild) {
            this._ref.removeChild(this._ref.firstChild);
        }
        this._controls = [];
        return this;
    }

    private _insertElement(el: HTMLElement) {
        if (!this._tryToInsertBeforeSubmitButton(el)) {
            this._ref.appendChild(el);
        }
    }

    private _tryToInsertBeforeSubmitButton(el: HTMLElement) {
        const submitButton = this._ref.querySelector('.gigya-composite-control-submit');
        if (submitButton) {
            const submitButtonParent = submitButton.parentElement;
            submitButtonParent.insertBefore(el, submitButton);
            return true;
        }
        return false;
    }
}
