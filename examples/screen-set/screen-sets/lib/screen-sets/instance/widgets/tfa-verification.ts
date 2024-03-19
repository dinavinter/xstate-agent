import { GigyaWidget } from '../widget';
import { WidgetType } from '../../template/control-template';
import {ScreenSetEvents} from '../screen-set-events';
import {Input} from '../fields/input';
import sleep from "gigya/dist/lib/helpers/sleep";


const TfaVerificationWidgetSelectors = {
    selector: '.gigya-composite-control-tfa-verification-widget',
    emptyListItemSelector: '.gigya-empty-list',
    emptyListItemActiveClass: 'gigya-empty-list-active',
    phoneCardSelector: '.gigya-tfa-verification-method[data-tfa-method="phone"] .gigya-card',
    emailCardSelector:'.gigya-tfa-verification-method[data-tfa-method="email"] .gigya-card',
    sendCodeButtonSelector: '.gigya-tfa-verification-action-btn',
    resendButtonSelector: '.gigya-tfa-resend-code',
    tfaMethodLabel: '.gigya-tfa-verification-device-label',
    inputErrorMsgEl: '.gigya-input-error.gigya-error-msg',
    errorMsgEl:'.gigya-form-error.gigya-error-msg',
    cardExpandedAtt: 'data-device-expanded',
    phoneListSelector: '.gigya-tfa-verification-method.tfa-phone-method',
    emailListSelector: '.gigya-tfa-verification-method.tfa-email-method'
}

export class TfaVerificationWidget extends GigyaWidget {

    public static get selector(): string {
        return `${TfaVerificationWidgetSelectors.selector}`;
    };

}

export class TfaVerificationWidgetList extends GigyaWidget {

    public constructor(protected nativeElement: HTMLDivElement, protected screenSetEvents: ScreenSetEvents) {
        super(nativeElement, screenSetEvents);
    }

    public get isEmptyList() {
        return this.nativeElement
            .querySelector(TfaVerificationWidgetSelectors.emptyListItemSelector)
            .classList.contains(TfaVerificationWidgetSelectors.emptyListItemActiveClass);
    }
}

export class TfaVerificationWidgetCard extends GigyaWidget
{
    public constructor(protected nativeElement: HTMLDivElement, protected screenSetEvents: ScreenSetEvents) {
        super(nativeElement, screenSetEvents);
    }

    public sendCodeButton() {
        const button: HTMLElement = this.nativeElement.querySelector(TfaVerificationWidgetSelectors.sendCodeButtonSelector);
        button.click();
    }
    public get resendButtonEl(): HTMLButtonElement {
        return this.nativeElement.querySelector(TfaVerificationWidgetSelectors.resendButtonSelector);
    }
    public resendCode() {
        this.resendButtonEl.click();
    }
    public isResendDisabled() {
        return Boolean(this.resendButtonEl.getAttribute('disabled')) &&
            gigya.utils.DOM.isElementClass(this.resendButtonEl, 'gigya-disabled');
    }
    public getLabel(): string {
        return this.nativeElement.querySelector(TfaVerificationWidgetSelectors.tfaMethodLabel)?.innerHTML;
    }
    public isExpanded(): boolean {
        return this.nativeElement.getAttribute(TfaVerificationWidgetSelectors.cardExpandedAtt) === 'true';
    }
    public isCollapsed(): boolean {
        return this.nativeElement.getAttribute(TfaVerificationWidgetSelectors.cardExpandedAtt) === 'false';
    }
    public get errorMsgEl(): HTMLElement {
        return this.nativeElement.querySelector(TfaVerificationWidgetSelectors.errorMsgEl);
    }
    public get inputErrorMsgEl(): HTMLElement {
        return this.nativeElement.querySelector(TfaVerificationWidgetSelectors.inputErrorMsgEl);
    }
    public getErrorMessage(): string {
        return this.errorMsgEl?.innerHTML;
    }
    public getInputErrorMessage(): string {
        return this.inputErrorMsgEl?.innerHTML;
    }
    public isErrorMessageVisible(): boolean {
        return gigya.utils.DOM.isVisible(this.errorMsgEl);
    }
    public async submit(value) {
        if (value) {
            this.setField(value);
        }
        this.clickSubmitBtn();
        await sleep(1);
    }

    public setField(value) {
        this.fieldInstance.value = value;
    }

    private get fieldInstance(): Input {
        return new Input(<HTMLInputElement>this.fieldEl);
    }

    public get fieldEl(): HTMLInputElement {
        return this.nativeElement.querySelector('.gigya-input-text');
    }

    private clickSubmitBtn() {
        const btn = <HTMLInputElement>this.nativeElement.querySelector(`.gigya-input-submit`);
        btn.click();
    }
}

export class TfaEmailVerificationCard extends TfaVerificationWidgetCard {
    public static get selector(): string {
        return `${TfaVerificationWidgetSelectors.emailCardSelector}`;
    };
}

export class TfaPhoneVerificationCard extends TfaVerificationWidgetCard {
    public static get selector(): string {
        return `${TfaVerificationWidgetSelectors.phoneCardSelector}`;
    };
}

export class TfaPhoneVerificationList extends TfaVerificationWidgetList {

    public static get selector(): string {
        return `${TfaVerificationWidgetSelectors.phoneListSelector}`;
    };

    public get phoneCards() {
        return this.nativeElement.querySelectorAll(TfaVerificationWidgetSelectors.phoneCardSelector);
    }
}

export class TfaEmailVerificationList extends TfaVerificationWidgetList {
    public static get selector(): string {
        return `${TfaVerificationWidgetSelectors.emailListSelector}`;
    };

    public get emailCards() {
        return this.nativeElement.querySelectorAll(TfaVerificationWidgetSelectors.emailCardSelector);
    }
}


GigyaWidget.addWidgetToLibrary(WidgetType.TfaVerification, TfaVerificationWidget);
GigyaWidget.addWidgetToLibrary(WidgetType.TfaVerificationEmailCard, TfaEmailVerificationCard);
GigyaWidget.addWidgetToLibrary(WidgetType.TfaVerificationPhoneCard, TfaPhoneVerificationCard);
GigyaWidget.addWidgetToLibrary(WidgetType.TfaVerificationEmailList, TfaEmailVerificationList);
GigyaWidget.addWidgetToLibrary(WidgetType.TfaVerificationPhoneList, TfaPhoneVerificationList);
