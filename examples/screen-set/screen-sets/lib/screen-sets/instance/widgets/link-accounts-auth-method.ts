import { GigyaWidget } from '../widget';
import { WidgetType } from '../../template/control-template';
import {EventType, ScreenSetEvents} from '../screen-set-events';
import {IAfterSubmitEvent, IAfterValidationEvent, IErrorEvent, IOnFieldChangedEvent} from '../../events.interface';
import {Input} from '../fields/input';


const selectors = {
  authMethodLabel: '.gigya-auth-method-label',
  cardHeaderSelector: '.gigya-card-header',
  resendButtonSelector: '.gigya-otp-resend-button'
}

export class LinkAccountsAuthMethod extends GigyaWidget {
  public constructor(protected nativeElement: HTMLDivElement, protected screenSetEvents: ScreenSetEvents) {
    super(nativeElement, screenSetEvents);
  }
  public toggle() {
    const header: HTMLElement = this.nativeElement.querySelector(selectors.cardHeaderSelector);
    header.click();
  }
  public resendCode() {
    this.resendButtonEl.click();
  }
  public isResendDisabled() {
    return Boolean(this.resendButtonEl.getAttribute('disabled')) &&
      gigya.utils.DOM.isElementClass(this.resendButtonEl, 'gigya-disabled');
  }
  public getLabel(): string {
    return this.nativeElement.querySelector(selectors.authMethodLabel)?.innerHTML;
  }
  public isExpanded(): boolean {
    return this.nativeElement.getAttribute('data-card-expanded') === 'true';
  }
  public isCollapsed(): boolean {
    return this.nativeElement.getAttribute('data-card-expanded') === 'false';
  }
  public getErrorMessage(): string {
    return this.errorMsgEl?.innerHTML;
  }
  public isErrorMessageVisible(): boolean {
    return gigya.utils.DOM.isVisible(this.errorDisplayEl) && gigya.utils.DOM.isVisible(this.errorMsgEl);
  }
  public async submit(value) {
    if (value) {
      await this.setField(value);
    }

    return new Promise( (resolve) => {
      this.screenSetEvents.addHook<IAfterValidationEvent>(EventType.onAfterValidation, e => {
        if(Object.keys(e.validationErrors)?.length) resolve(false);
      });
      this.screenSetEvents.addHook<IAfterSubmitEvent>(EventType.onAfterSubmit, () => setTimeout(() => resolve(true), 0));
      this.screenSetEvents.addHook<IErrorEvent>(EventType.onError, () => resolve(false));
      this.clickSubmitBtn();
    });
  }

  public setField(value) {
    return new Promise<boolean>(resolve => {
      this.screenSetEvents.addHook<IOnFieldChangedEvent>(EventType.onFieldChanged,e => {
        if (e.field === this.fieldName) resolve(true);
      });
      this.screenSetEvents.addHook<IErrorEvent>(EventType.onError, () => {
        resolve(false);
      })
      this.fieldInstance.value = value;
    });
  }

  private get errorMsgEl(): HTMLElement {
    return this.nativeElement.querySelector('.gigya-error-msg');
  }

  private get errorDisplayEl(): HTMLElement {
    return this.nativeElement.querySelector('.gigya-error-display');
  }

  private get resendButtonEl(): HTMLElement {
    return this.nativeElement.querySelector(selectors.resendButtonSelector);
  }

  private get fieldInstance(): Input {
    return new Input(<HTMLInputElement>this.fieldEl);
  }

  private get fieldEl(): HTMLInputElement {
    return this.nativeElement.querySelector('.gigya-input-text');
  }

  private get fieldName(): string {
    return this.fieldEl.getAttribute('name');
  }

  private clickSubmitBtn() {
    const btn = <HTMLInputElement>this.nativeElement.querySelector(`.gigya-input-submit`);
    btn.click();
  }

  private getTabIndex() {
    return this.nativeElement.querySelector(`.gigya-card-header`).getAttribute('tabindex');
  }
}

export class EmailOtpLinkAccountsAuthMethod extends LinkAccountsAuthMethod {
  public static get selector(): string {
    return '.gigya-auth-method[data-auth-method="emailOtp"]'
  };
}

export class PhoneLinkAccountsAuthMethod extends LinkAccountsAuthMethod  {
  public static get selector(): string {
    return '.gigya-auth-method[data-auth-method="phone"]'
  };
}

export class PasswordLinkAccountsAuthMethod extends LinkAccountsAuthMethod  {
  public static get selector(): string {
    return '.gigya-auth-method[data-auth-method="site"]'
  };
}


GigyaWidget.addWidgetToLibrary(WidgetType.EmailOtpLinkAccountsAuthMethod, EmailOtpLinkAccountsAuthMethod);
GigyaWidget.addWidgetToLibrary(WidgetType.PhoneLinkAccountsAuthMethod, PhoneLinkAccountsAuthMethod);
GigyaWidget.addWidgetToLibrary(WidgetType.PasswordLinkAccountsAuthMethod, PasswordLinkAccountsAuthMethod);
