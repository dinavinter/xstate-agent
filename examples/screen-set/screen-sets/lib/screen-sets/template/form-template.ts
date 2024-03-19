import {GigyaScreenType} from './screen-template';
import {ContainerTemplate} from './widgets/container-template';
import {ControlCollectionTemplate} from './control-collection-template';
import {InputTemplate} from './input-template';
import {ControlAttributes} from './control-template';

const FormAttributes = {
    AutoSkip: 'data-auto-skip',
    OnAutoSkipScreen: 'data-on-auto-skip-screen',
    onScreenSetSkippedScreen: 'data-on-screenset-skipped-screen',
    onSuccessScreen: 'data-on-success-screen',
    onMissingLoginIDScreen: 'data-on-missing-loginid-screen'
};


export class FormTemplate extends ControlCollectionTemplate {
    private readonly _type: FormType;
    private _containers: ContainerTemplate[] = [];

    constructor(private _formRef: HTMLFormElement) {
        super(_formRef);
        this._type = <FormType>_formRef.className;
    }

    public get type(): FormType {
        return this._type;
    }

    public addSubmitButton(): FormTemplate {
        const submitButton = document.createElement('input') as HTMLInputElement;
        submitButton.type = 'submit';
        submitButton.className = 'gigya-input-submit';
        const submitButtonWrapper = document.createElement('div');
        submitButtonWrapper.className = 'gigya-composite-control gigya-composite-control-submit';
        submitButtonWrapper.appendChild(submitButton);
        this._formRef.appendChild(submitButtonWrapper);
        return this;
    }

    public getInput<T extends InputTemplate>(name: string): T {
        return super.getInput<T>(name) || this._containers
            .map(c => c.getInput<T>(name))
            .filter(i => Boolean(i))[0];
    }

    public addContainer(name?: string): ContainerTemplate {
        const div = document.createElement('div');
        div.setAttribute("name",name);
        this._formRef.appendChild(div);
        const container = new ContainerTemplate(div);
        this._containers.push(container);
        return container;
    }

    public addComponentWrapper(wrapperId: string, className?: string, errorData?: {mappedField: string, arrayKeyValue: string}): FormTemplate {
        const wrapper = document.createElement('div');
        wrapper.className = className;
        wrapper.setAttribute('id', wrapperId);

        if (errorData) {
            const error = document.createElement('span');
            error.className = 'gigya-error-msg';
            error.setAttribute(ControlAttributes.Bounded, errorData.mappedField);
            error.setAttribute(ControlAttributes.ArrayKeyValue, errorData.arrayKeyValue);

            wrapper.appendChild(error);
        }

        this._formRef.appendChild(wrapper);
        return this;
    }

    public clear(): FormTemplate {
        super.clear();
        return this;
    }

    public set autoSkip(value: boolean) {
        this._formRef.setAttribute(FormAttributes.AutoSkip, String(value));
    }

    public set onAutoSkipScreen(value: GigyaScreenType) {
        this._formRef.setAttribute(FormAttributes.OnAutoSkipScreen, String(value));
    }

    public set onScreenSetSkippedScreen(value: GigyaScreenType) {
        this._formRef.setAttribute(FormAttributes.onScreenSetSkippedScreen, String(value));
    }

    public set onSuccessScreen(value: GigyaScreenType) {
        if (value)
            this._formRef.setAttribute(FormAttributes.onSuccessScreen, String(value));
        else this._formRef.removeAttribute(FormAttributes.onSuccessScreen);
    }

    public set onMissingLoginIDScreen(value: GigyaScreenType) {
        this._formRef.setAttribute(FormAttributes.onMissingLoginIDScreen, String(value));
    }
}

export enum FormType {
    Login = 'gigya-login-form',
    Register = 'gigya-register-form',
    CompleteRegistration = 'gigya-complete-registration-form',
    MobileLogin = 'gigya-mobile-login-form',
    MobileLoginVerification = 'gigya-mobile-login-verification',
    ForgotPassword = 'gigya-forgot-password-form',
    ForgotPasswordSuccess = 'gigya-forgot-password-success-form',
    ResetPassword = 'gigya-reset-password-form',
    ResetPasswordSucces = 'gigya-reset-password-success-form',
    PasswordChangeRequired = 'gigya-password-change-required-form',
    VerificationPending = 'gigya-verification-pending-form',
    TFARegistration = 'gigya-tfa-registration-form',
    TFAVerification = 'gigya-tfa-verification-form',
    VerificationSent = 'gigya-verification-sent-form',
    ProfileUpdate = 'gigya-update-profile-form',
    TFAEdit = 'gigya-tfa-edit-form',
    ChangePassword = 'gigya-change-password-form',
    OtpSendCode = 'gigya-otp-send-code-form',
    OtpUpdate = 'gigya-otp-update-form',
    TFA = 'gigya-tfa-form',
}
