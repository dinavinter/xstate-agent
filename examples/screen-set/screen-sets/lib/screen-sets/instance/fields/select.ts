import {GigyaField} from "../field";
import {getFirstMatchingOption} from "../../../../helpers/utils";

export class Select extends GigyaField {

    constructor(protected nativeElement: HTMLSelectElement) {
        super(nativeElement);
    }

    public set value(val: string) {
        const ind = getFirstMatchingOption(this.nativeElement, val);
        if(ind && ind > 0) {
            this.nativeElement.selectedIndex = ind;
        }
    }

    public get value(): string {
        return this.nativeElement.selectedOptions[0] ? this.nativeElement.selectedOptions[0].value : '';
    }
}
