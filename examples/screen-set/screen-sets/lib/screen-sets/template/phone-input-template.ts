import {InputData} from "./input-template";
import {CompositeInputType} from "./control-template";
import {CompositeInputTemplate} from './composite-input-template';

export const PhoneInput_Attributes = {
    countryCodesSelection: 'data-country-codes-selection',
    countryCodes: 'data-country-codes'
}
export const enum CountryCodeSelection {
    All = 'all',
    Specific = 'specific',
}

export class PhoneInputTemplate extends CompositeInputTemplate {
    public get countryCodes(): Array<string> {
        const options = Array.from(
            this.ref?.querySelectorAll<HTMLOptionElement>('option[value]:not([value="0"])') || [])
        return options.map(option => option?.getAttribute('value'));
    }

    public set specificCountryCodes(countryCodes: string[]) {
        this.addMetadata(PhoneInput_Attributes.countryCodesSelection, CountryCodeSelection.Specific);
        this.addMetadata(PhoneInput_Attributes.countryCodes, countryCodes.join(','));
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
