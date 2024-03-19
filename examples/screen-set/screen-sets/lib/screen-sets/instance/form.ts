import {IAfterSubmitEvent, IAfterValidationEvent, IErrorEvent, IOnFieldChangedEvent} from "../events.interface";
import {FormType} from "../template/form-template";
import {FieldElementType, GigyaField} from "./field";
import {ControlAttributes} from "../template/control-template";
import {EventType, ScreenSetEvents} from "./screen-set-events";
import {Input} from "./fields/input";
import {Select} from "./fields/select";
import {PhoneNumber} from "./fields/phone-number";
import {GigyaScreenType} from "../template/screen-template";
import {CheckboxInput} from "./fields/checkbox";
import {ScreenSetType} from '../template/screen-set-template';

export class GigyaForm {
    private readonly _type: FormType;
    private _fields: Map<string, GigyaField[]> = new Map<string, GigyaField[]>();

    constructor(private _nativeElement: HTMLFormElement, private screenSetEvents: ScreenSetEvents) {
        this._type = <FormType>_nativeElement.className;
        const fields = _nativeElement.querySelectorAll('input[data-gigya-name],select[data-gigya-name],fieldset[data-gigya-name]');
        for(let i = 0; i < fields.length; i++){
            const field = fields[i];
            const fieldName = field.getAttribute('data-gigya-name');
            const instance = this._getFieldInstance(<FieldElementType>field);
            if(this._fields.get(fieldName)) {
                this._fields.get(fieldName).push(instance);
            }
            else this._fields.set(fieldName, [instance]);
        }
    }

    public get type(): FormType {
        return this._type;
    }

    public sleep = async (milliseconds) => {
        await new Promise(resolve => {
            return setTimeout(resolve, milliseconds)
        });
    };



    public setField(name: string, value: string | number): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.screenSetEvents.addHook<IOnFieldChangedEvent>(EventType.onFieldChanged,e => {
                if(e.field === name) resolve(true);
            });
            this.screenSetEvents.addHook<IErrorEvent>(EventType.onError, () => {
                resolve(false);
            });
            const field = this.getField(name);
            if(!field) {
                resolve(false);
            } else {
                field.value = String(value);
            }
        });
    }

    public getField<T extends GigyaField>(name: string, arrayKeyValue?: string): T {
        return this.getFields(name, arrayKeyValue)[0] as T;
    }

    public getFields<T extends GigyaField>(name: string, arrayKeyValue?: string): T[] {
        if(!this._fields.get(name)?.length) {
            return [];
        }

        const fields =  arrayKeyValue ?
            this._fields.get(name).filter(field => (<GigyaField>field).arrayKeyValue === arrayKeyValue) as T[] :
            this._fields.get(name) as T[];

        return fields.filter(async f => await f.waitForVisible()) as T[];
    }


    public getSwitchScreenAnchor(targetScreen: GigyaScreenType, targetScreenSet?: ScreenSetType) {
        const anchorsElements = Array.from(this._nativeElement.querySelectorAll<HTMLAnchorElement>('.gigya-composite-control-link[data-switch-screen]'))
            .filter(anchor => {
                return anchor.getAttribute('data-switch-screen') === (targetScreenSet ? `${targetScreenSet}/` : '' +  targetScreen);
            } );
        return anchorsElements[0];

    }

    public getElement(selector: string): HTMLElement {
        return this._nativeElement.querySelector(selector);
    }

    public getElements(selector: string): NodeListOf<HTMLElement> {
        return this._nativeElement.querySelectorAll(selector);
    }

    public getByTemplateIdentifier(identifier: string): HTMLElement {
        return this._nativeElement.querySelector(`[${ControlAttributes.UniqueReference}="${identifier}"]`);
    }

    public get errorMessage(): string {
        const errorEl = <HTMLDivElement>this._nativeElement.querySelector('div.gigya-form-error-msg');
        if(!errorEl) return '';
        return errorEl.innerText;
    }

    public submit(fields: {} = {}): Promise<boolean> {
        return new Promise(resolve => {
            if(Object.keys(fields).length) {
                Object.keys(fields).forEach(key => this.setField(key, fields[key]));
            }
            this.screenSetEvents.addHook<IAfterValidationEvent>(EventType.onAfterValidation, e => {
                if(Object.keys(e.validationErrors)?.length) resolve(false);
            });
            this.screenSetEvents.addHook<IAfterSubmitEvent>(EventType.onAfterSubmit, () => setTimeout(() => resolve(true), 0));
            this.screenSetEvents.addHook<IErrorEvent>(EventType.onError, () => resolve(false));
            const btn = <HTMLInputElement>this._nativeElement.querySelector(`.gigya-input-submit`);
            btn.click();
        });
    }

    public getAuthMethod(loginMethod: LoginMethod): HTMLInputElement {
        return this._nativeElement.querySelector(`[data-auth-method="${loginMethod}"]`)
    }

    private _getFieldInstance(field: FieldElementType) {
        switch(field.tagName.toLowerCase()) {
            case 'input':
                switch (field.getAttribute('type')) {
                    case 'checkbox':
                        return new CheckboxInput(<HTMLInputElement>field);
                    case 'text':
                    default:
                        return new Input(<HTMLInputElement>field);
                }
            case 'select':
                return new Select(<HTMLSelectElement>field);
            case 'fieldset':
                switch(field.getAttribute('type')) {
                    case 'gigya-phone-number-input':
                        return new PhoneNumber(<HTMLFieldSetElement>field);
                }
        }
    }
}

export enum LoginMethod {
    Password = "password",
    Push = "push",
    MagicLink = "magicLink",
    EmailOTP = "emailOtp"
}
