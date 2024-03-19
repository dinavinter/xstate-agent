import {GigyaField} from "../field";
import {getFirstMatchingOption} from "../../../../helpers/utils";
import {uniq} from 'lodash';

export class PhoneNumber extends GigyaField {
    private readonly _countryCodeElement: HTMLSelectElement;
    private _subscriberNumberElement: HTMLInputElement;
    private _countryCodesOptions: HTMLOptionElement[];
    constructor(protected nativeElement: HTMLFieldSetElement) {
        super(nativeElement);
        this._countryCodeElement = this.nativeElement.querySelector(`select.${PhoneNumberClasses.CountryCode}`);
        this._subscriberNumberElement = this.nativeElement.querySelector(`input.${PhoneNumberClasses.SubscriberNumber}`);
        this._countryCodesOptions = Array.from(
            this.nativeElement?.querySelectorAll<HTMLOptionElement>('option[value]:not([value="0"])') || []);
    }

    public selectCountry(countryCode: string): PhoneNumber {
        const selectedIndex = !countryCode ? 0 : getFirstMatchingOption(this._countryCodeElement, countryCode);
        this._countryCodeElement.value = this._countryCodeElement.options[selectedIndex].value;
        this._countryCodeElement.selectedIndex = selectedIndex;
        return this;
    }

    public setSubscriberNumber(value: string): PhoneNumber {
        this._subscriberNumberElement.value = value;
        return this;
    }

    public get countryCode(): string {
        return this._countryCodeElement.value;
    }

    public get subscriberNumber(): string {
        return this._subscriberNumberElement.value;
    }

    public get uniqueCountryCodes(): string[] {
        return uniq(this._countryCodesOptions.map(countryCode => countryCode.value));
    }

    public get countryCodes(): string[] {
        return this._countryCodesOptions.map(countryCode => countryCode.value);
    }

    public set value(val: string) {
        this.selectCountry(val);
        this.setSubscriberNumber(val.substr(this.countryCode.length));
        this._countryCodeElement.dispatchEvent(new Event('change'));
        this._subscriberNumberElement.dispatchEvent(new Event('input')); //trigger web-sdk input change listener
    }

    public get value(): string {
        const countryCode = this._countryCodeElement.selectedOptions[0] && this._countryCodeElement.selectedOptions[0].value;
        const subscriberNumber = this._subscriberNumberElement.value;
        if(!countryCode || !subscriberNumber) {
            return '';
        }
        return `${countryCode}${subscriberNumber.replace(/^0+/,'')}`;
    }

    public get placeholder(): string {
        return this._subscriberNumberElement.getAttribute('placeholder');
    }
}

export enum PhoneNumberClasses {
    Wrapper = 'gigya-composite-control-phone-number-input',
    CountryCode = 'gigya-country-code-select',
    SubscriberNumber = 'gigya-subscriber-phone-number-input'
}

export interface ICountryCode {
    countryName?: string;
    code?: number;
}
