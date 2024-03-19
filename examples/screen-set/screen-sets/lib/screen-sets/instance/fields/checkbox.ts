import { Input } from "./input";

export class CheckboxInput extends Input {

    public set value(val: string) {
        if (val === 'true'){
            this.nativeElement.setAttribute('checked', 'checked');
            (this.nativeElement as HTMLInputElement).checked = true;
        } else {
            this.nativeElement.removeAttribute('checked');
            (this.nativeElement as HTMLInputElement).checked = false;
        }
        super.setValue(val);
    }

    public get value(): string {
        return (this.nativeElement as HTMLInputElement).checked.toString();
    }
}
