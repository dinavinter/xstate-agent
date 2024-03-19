import {GigyaScreenType} from "./screen-template";
import {ScreenSetType} from "./screen-set-template";

export const enum ControlAttributes {
    UniqueReference = 'data-unique-reference',
    Condition = 'data-condition',
    Required = 'data-required',
    KeepVisible = 'data-on-render',
    Bounded = 'data-bound-to',
    SwitchScreen = 'data-switch-screen',
    ApiLinkAttribute = 'data-gigya-api-link',
    ApiCallRetriesAttribute = 'data-gigya-api-call-retries',
    TranslationKey = 'data-translation-key',
    Placeholder = 'data-gigya-placeholder',
    AllowEmpty = 'allow-empty',
    Label = 'data-label',
    ArrayKeyField = 'data-array-key-field',
    ArrayKeyValue = 'data-array-key-value',
    ArrayRoot = 'data-array-root',
    Value = 'value',
    IdentifierType = 'identifier-type',
    subscriptionType ='data-subscription-type',
    subscriptionTopic = 'data-subscription-topic',
    subscriptionChannel = 'data-subscription-channel',
    subscriptionStatus = 'data-communication-status',
    checked = 'data-checked',
}


export class ControlTemplate {
    private _container: HTMLDivElement;
    private static _idGenerator = 1;

    constructor(protected ref: HTMLElement) {}

    public setHtml(html: string): ControlTemplate {
        this.getRef().innerHTML = html;
        return this;
    }

    public setAttribute(attrName: ControlAttributes, attrValue: string): ControlTemplate {
        this.getRef().setAttribute(attrName, attrValue);
        return this;
    }

    public onClickSwitchToScreen(screen: GigyaScreenType, otherScreenSet?: ScreenSetType): ControlTemplate {
        if(otherScreenSet) {
            screen = `Default-${otherScreenSet}/${screen}`;
        }
        this.setAttribute(ControlAttributes.SwitchScreen, screen);
        return this;
    }

    public setTranslationKey(translationKey: string) {
        this.setAttribute(ControlAttributes.TranslationKey, translationKey);
        this.getRef().innerHTML = ''; // settings translation key means that the translation widget will determine the inner html. this behavior is similar to what the UI builder does
        return this;
    }

    public visibleWhen(jsExp: string, keepVisible = false): ControlTemplate {
        if(!this._container) {
            this._container = document.createElement('div') as HTMLDivElement;
            this._container.className = 'gigya-container gigya-visible-when';
            const parent = this.getRef().parentElement;
            this._container.setAttribute(ControlAttributes.Condition, jsExp);
            this._container.appendChild(this.ref);
            parent.appendChild(this._container);
        }
        else {
            this._container.setAttribute(ControlAttributes.Condition, jsExp);
        }

        if(keepVisible) {
            this._container.setAttribute(ControlAttributes.KeepVisible, 'true');
        }
        else {
            this._container.removeAttribute(ControlAttributes.KeepVisible);
        }
        return this;
    }

    public get uniqueInstanceReference() {
        return this.getRef().getAttribute(ControlAttributes.UniqueReference);
    }

    public static createTemplate(type: ControlType, uniqueIdentifier?: string): HTMLElement {
        const props = ControlProperties.get(<ControlType>type);
        if(!props) {
            throw new Error(`Unsupported control type`);
        }
        const wrapperElement = document.createElement(props.tagName);
        wrapperElement.setAttribute(ControlAttributes.UniqueReference, uniqueIdentifier || `${props.tagName}_${this.generateID}`);
        wrapperElement.className = `gigya-composite-control gigya-composite-control-${props.toolboxKind}`;
        if(props.attrs)
            Object.keys(props.attrs)
                .forEach(attrName => wrapperElement.setAttribute(attrName, props.attrs[attrName]));
        return wrapperElement;
    }

    protected getRef(): HTMLElement {
        return this.ref;
    }

    protected static get generateID(): number {
        return this._idGenerator++;
    }
}

export type InputElement = HTMLInputElement | HTMLSelectElement;

export enum ViewControlType {
    Label,
    Header,
    Link,
    Image,
    FormError,
    Spacer
}

export enum InputType {
    TextBox,
    CheckBox,
    DropDown,
    Metadata,
    Submit,
    Composite,
    Radio,
    Password
}

export enum WidgetType {
    Consent = 'consent',
    Subscription = 'subscription',
    Communication = 'communication',
    EmailOtpLinkAccountsAuthMethod = 'email-otp-link-accounts-auth-method',
    PhoneLinkAccountsAuthMethod = 'phone-link-accounts-auth-method',
    PasswordLinkAccountsAuthMethod = 'password-link-accounts-auth-method',
    ApiLink = 'api-link',
    PasskeyLogin = 'passkey-login',
    PasskeyRegister = 'passkey-register',
    PasskeyManager = 'passkey-manager',
    PasskeyManagerCard = 'passkey-manager-card',
    OrganizationContext = 'organization-context',
    AuthMethod = 'auth-method',
    TfaVerification = 'tfa-verification',
    TfaVerificationEmailCard = 'tfa-verification-email-card',
    TfaVerificationPhoneCard = 'tfa-verification-phone-card',
    TfaVerificationEmailList = 'tfa-verification-email-list',
    TfaVerificationPhoneList= 'tfa-verification-phone-list'
}

export enum CompositeInputType {
    PhoneNumber
}

export type ControlType = ViewControlType | InputType | CompositeInputType | WidgetType;

export interface ControlData {
    toolboxKind?: 'label' | 'form-error' | 'image' | 'spacer' | 'link' | 'header';
    tagName: 'label' | 'h2' | 'a' | 'div';
    attrs?: {[attrName: string]: string};
}

export const ControlProperties = new Map<ControlType, ControlData>();

ControlProperties.set(ViewControlType.Label, {tagName: 'label', toolboxKind: 'label', attrs: {'data-binding': 'true'}});
ControlProperties.set(ViewControlType.Header, {tagName: 'h2', toolboxKind: 'header'});
ControlProperties.set(ViewControlType.Link, {tagName: 'a', toolboxKind: 'link', attrs: {'data-binding': 'true'}});
ControlProperties.set(ViewControlType.FormError, {tagName: 'div', toolboxKind: 'form-error'});
ControlProperties.set(ViewControlType.Image, {tagName: 'div', toolboxKind: 'image'});
ControlProperties.set(ViewControlType.Spacer, {tagName: 'div', toolboxKind: 'spacer'});
