import {GigyaWidget} from '../widget';
import {ControlAttributes, WidgetType} from '../../template/control-template';

export class CommunicationWidget extends GigyaWidget {
    public static get selector(): string {
        return 'div.gigya-communication';
    }

    public get label(): string {
        return this.labelElement?.innerText;
    }

    public get status(): string {
        return this.inputElement?.getAttribute(ControlAttributes.subscriptionStatus);
    }

    public get checked(): boolean {
        return this.inputElement?.checked;
    }

    public get inputId(): string {
        return this.inputElement?.id;
    }

    public click(): void {
        return this.inputElement?.click();
    }

    private get inputElement(): HTMLInputElement {
        return this.nativeElement.querySelector('input');
    }

    private get labelElement(): HTMLLabelElement {
        return this.nativeElement.querySelector('label');
    }
}

GigyaWidget.addWidgetToLibrary(WidgetType.Communication, CommunicationWidget);
