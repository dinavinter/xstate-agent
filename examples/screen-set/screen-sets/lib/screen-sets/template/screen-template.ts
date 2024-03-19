import {FormTemplate, FormType} from "./form-template";
import {ControlCollectionTemplate} from "./control-collection-template";
import {AB_TESTING_ATTRIBUTES, IVariantConfig} from "./screen-set-template";

export class ScreenTemplate extends ControlCollectionTemplate {
    private _form: FormTemplate;
    private readonly _originalTemplate: string;

    constructor(private _screenRef: HTMLDivElement) {
        super(_screenRef);
        this._originalTemplate = _screenRef.innerHTML;
    }

    public getFormTemplate(): FormTemplate {
        this._form = this._form
            || new FormTemplate(<HTMLFormElement>this._screenRef.querySelector('form'));
        return this._form;
    }

    public get id() {
        return this._screenRef.id;
    }

    public setAsScreenVariant(variant: IVariantConfig, groupId: string, testId: string) {
        this.addMetadata(AB_TESTING_ATTRIBUTES.GROUP, groupId);
        this.addMetadata(AB_TESTING_ATTRIBUTES.PERCENTAGE, variant.percentage.toString());
        this.addMetadata(AB_TESTING_ATTRIBUTES.TEST_ID, testId);

        if (variant.isOriginal) {
            this.addMetadata(AB_TESTING_ATTRIBUTES.ORIGINAL_SCREEN, 'true');
        }
    }

    public get template(): string {
        return this._originalTemplate;
    }

    public get attributes(): Array<Attr> {
        return Array.from(this._screenRef.attributes);
    }

    public clear(): ControlCollectionTemplate {
        this._form = null;
        return super.clear();
    }

    public get behavior(): ScreenBehavior {
        const form = this.getFormTemplate();
        if(form) {
            return form.type;
        }
        return 'Information';
    }

    public set caption(value: string) {
        this._screenRef.setAttribute(ScreenAttributes.Caption, value);
    }

    public set width(value: number) {
        this._screenRef.setAttribute(ScreenAttributes.Width, String(value));
    }

    public set height(value: number) {
        this._screenRef.setAttribute(ScreenAttributes.Height, String(value));
    }

    public set responsive(value: boolean) {
        this._screenRef.setAttribute(ScreenAttributes.Responsive, String(value));
    }

    public set onExistingLoginIDIdentifierScreen(value: GigyaScreenType) {
        this._screenRef.setAttribute(ScreenAttributes.OnExistingLoginIDIdentifierScreen, String(value));
    }

    public set onMissingLoginIDScreen(value: GigyaScreenType) {
        this._screenRef.setAttribute(ScreenAttributes.OnMissingLoginIDScreen, String(value));
    }

    public set onPendingPasswordChange(value: GigyaScreenType) {
        this._screenRef.setAttribute(ScreenAttributes.OnPendingPasswordChange, String(value));
    }

    public set onPendingEmailVerificationCode(value: GigyaScreenType) {
        this._screenRef.setAttribute(ScreenAttributes.OnPendingEmailVerificationCode, String(value));
    }

    public set onPendingRegistrationScreen(value: GigyaScreenType) {
        this._screenRef.setAttribute(ScreenAttributes.OnPendingRegistrationScreen, String(value));
    }

    public set onPendingVerificationScreen(value: GigyaScreenType) {
        this._screenRef.setAttribute(ScreenAttributes.OnPendingVerificationScreen, String(value));
    }
}

export enum DefaultScreenID {
    Login = 'gigya-login-screen',
    Register = 'gigya-register-screen',
    PasswordlessLogin = 'gigya-passwordless-login-screen',
    PasswordlessRegister = 'gigya-passwordless-register-screen',
    AuthMethods = 'gigya-auth-methods-screen',
    PasswordAuth = 'gigya-password-auth-method-screen',
    PushAuth = 'gigya-push-auth-method-screen',
    MagicLinkAuth = 'gigya-magic-link-auth-method-screen',
    CompleteRegistration = 'gigya-complete-registration-screen',
    MobileLogin = 'gigya-mobile-login-screen',
    MobileEdit = 'gigya-mobile-edit-screen',
    MobileLoginVerification = 'gigya-mobile-verification-screen',
    MobileEditVerification = 'gigya-mobile-edit-verification-screen',
    ChangeEmail = 'gigya-change-email-screen',
    VerifyEmailCode = 'gigya-email-code-verification-screen',
    ForgotPassword = 'gigya-forgot-password-screen',
    ForgotPasswordSent = 'gigya-forgot-password-success-screen',
    MobileForgotPassword = 'gigya-mobile-forgot-password-screen',
    MobileForgotPasswordVerification = 'gigya-mobile-forgot-password-verification-screen',
    ResetPassword = 'gigya-reset-password-screen',
    ResetPasswordSuccess = 'gigya-reset-password-success-screen',
    MandatoryPasswordChange = 'gigya-password-change-required-screen',
    VerificationPending = 'gigya-verification-pending-screen',
    TFARegistration = 'gigya-tfa-registration-screen',
    TFAVerification = 'gigya-tfa-verification-screen',
    VerificationSent = 'gigya-verification-sent-screen',
    UpdateProfile = 'gigya-update-profile-screen',
    TFAEdit = 'gigya-tfa-edit-screen',
    ChangePassword = 'gigya-change-password-screen',
    LinkAccount = 'gigya-link-account-screen',
    LinkAccountsVerification = 'gigya-link-accounts-verification-screen',
    ReAuthentication = 'gigya-reauthentication-screen',
    SubscribeWithEmail = 'gigya-subscribe-with-email-screen',
    SubscribeOneAccount = 'gigya-subscribe-one-account-screen',
    EmailOtpAuth = 'gigya-email-code-auth-method-screen',
    LinkAccountProgression = 'gigya-lite-account-progression-screen',
    SubscribeThankYouScreen = 'gigya-subscribe-thank-you-screen',
    Communication = 'gigya-communication-screen',
    Privacy = 'gigya-privacy-screen',
    DeviceRegistration = 'gigya-device-code-verification-screen',
    DeviceRegistrationThankYou = 'gigya-device-code-thank-you-screen',
    PasskeyManager = 'gigya-passkeys-manager-screen',
    ChangeOrganizationContext = 'gigya-change-organization-context-screen'
}

export const ScreenAttributes = {
    Caption: 'data-caption',
    Width: 'data-width',
    Height: 'data-height',
    Responsive: 'data-responsive',
    OnExistingLoginIDIdentifierScreen: 'data-on-existing-login-identifier-screen',
    OnMissingLoginIDScreen: 'data-on-missing-loginid-screen',
    OnPendingPasswordChange: 'data-on-pending-password-change',
    OnPendingEmailVerificationCode: 'data-on-pending-email-verification-code',
    OnPendingRegistrationScreen: 'data-on-pending-registration-screen',
    OnPendingVerificationScreen: 'data-on-pending-verification-screen'
};

export enum EndFlowScreen {
    Finish = '_finish',
    Skip = '_skip',
    Cancel = '_cancel'
}

export enum  SocialProvider  {
    Facebook = 'facebook',
    Google = 'googleplus',
}

export type GigyaScreenType = DefaultScreenID & EndFlowScreen | string;

export type ScreenBehavior = FormType | 'Information';
