import {GigyaField} from "../field";

export class Input extends GigyaField {

    constructor(protected nativeElement: HTMLInputElement | HTMLSelectElement) {
        super(nativeElement);
    }

    protected setValue(val: string){
        this.focus();
        this.nativeElement.value = val;
        this.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {key: val[0]})); //trigger web-sdk input change listener
        this.blur();
    }

    public set value(val: string) {
        this.setValue(val);
    }

    public get value(): string {
        return this.nativeElement.value;
    }

    public focus() {
        this.nativeElement.dispatchEvent(new UIEvent('focus'));
    }

    public blur() {
        this.nativeElement.dispatchEvent(new UIEvent('blur'));
    }

    public click() {
        this.nativeElement.click();
    }
}
