import {ControlAttributes, WidgetType} from '../control-template';
import {WidgetTemplate} from '../widget-template';

const passwordTemplate = require(`../../../../mocks/screen-sets/widgets/link-accounts-auth-method-password.html`);
const emailOtpTemplate = require(`../../../../mocks/screen-sets/widgets/link-accounts-auth-method-email-otp.html`);
const phoneTemplate = require(`../../../../mocks/screen-sets/widgets/link-accounts-auth-method-phone.html`);

export const LinKAccountsAuthMethodAttributes = {
  selector: '[data-gigya-api-link]',
  apiLink: 'data-gigya-api-link',
  translationKey: 'data-translation-key',
  disableOnRender: 'data-disable-on-render',
  disableTimeout: 'data-disable-timeout'
};

export class EmailOtpLinkAccountsAuthMethodTemplate extends WidgetTemplate {
  public static getTemplate(uniqueIdentifier?: string): HTMLElement {
    return createTemplateElement(emailOtpTemplate, uniqueIdentifier);
  }
}

export class PhoneLinkAccountsAuthMethodTemplate extends WidgetTemplate {
  public static getTemplate(uniqueIdentifier?: string): HTMLElement {
    return createTemplateElement(phoneTemplate, uniqueIdentifier);
  }
}

export class PasswordLinkAccountsAuthMethodTemplate extends WidgetTemplate {
  public static getTemplate(uniqueIdentifier?: string): HTMLElement {
    return createTemplateElement(passwordTemplate, uniqueIdentifier);
  }
}

function createTemplateElement(template: string, uniqueIdentifier: string): HTMLElement {
  const templateEl = document.createElement('template');
  templateEl.innerHTML = template;
  templateEl.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier);

  return templateEl.content.firstChild as HTMLElement;
}

WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.EmailOtpLinkAccountsAuthMethod, EmailOtpLinkAccountsAuthMethodTemplate);
WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.PhoneLinkAccountsAuthMethod, PhoneLinkAccountsAuthMethodTemplate);
WidgetTemplate.addWidgetTemplateToLibrary(WidgetType.PasswordLinkAccountsAuthMethod, PasswordLinkAccountsAuthMethodTemplate);
