import {isElementVisible, isParentHasClass} from '../../../helpers/utils';
export declare type FieldElementType = HTMLInputElement | HTMLSelectElement | HTMLFieldSetElement;
export abstract class GigyaField {
    protected wrapper: HTMLDivElement;

    protected constructor(protected nativeElement: FieldElementType) {
        this.wrapper = <HTMLDivElement>nativeElement.parentElement;
        if(!isParentHasClass(this.wrapper, GigyaFieldClasses.Wrapper)) {
            throw new Error('Invalid gigya input');
        }
    }

    public get errorMessage(): string {
        const errorEl = <HTMLSpanElement>this.wrapper.querySelector(`span.${GigyaFieldClasses.ErrorMessage}`);
        if(!errorEl) return '';
        return errorEl.innerText;
    }

    public get arrayKeyValue(): string {
        return this.nativeElement.getAttribute('data-array-key-value');
    }

    public get isRequired(): boolean {
        return this.nativeElement.hasAttribute('data-required')
    }

    public get termsError(): boolean {
        //check if consent checkbox has error class that surrounds it.
        return this.wrapper.classList.contains('gigya-terms-error')
    }

    public get labelText(): string {
        const labelEl = <HTMLSpanElement>this.wrapper.querySelector(`span.${GigyaFieldClasses.Label}`);
        if(!labelEl) return '';
        return labelEl.innerText;
    }

    public get isRequiredAsteriskVisible(): boolean {
        const asterisk = <HTMLSpanElement>this.wrapper.querySelector(`.${GigyaFieldClasses.RequiredDisplay}`);

        return isElementVisible(asterisk);
    }


    /* 1 milliseconds is tested to be consistent for the web-sdk digest cycle to finish */
    public async waitForVisible(wait: number = 1): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            setTimeout(() => resolve(
                isElementVisible(this.nativeElement)
            ), wait);
        });
    }

    public isVisible(): boolean {
        return isElementVisible(this.nativeElement);
    }

    public abstract set value(val: string);

    public abstract get value(): string;

    public get wrapperElement(): HTMLElement {
        return this.wrapper;
    }

}

export const GigyaFieldClasses = {
    Wrapper: 'gigya-composite-control',
    ErrorMessage: 'gigya-error-msg',
    Label: 'gigya-label-text',
    RequiredDisplay: 'gigya-required-display'
};
