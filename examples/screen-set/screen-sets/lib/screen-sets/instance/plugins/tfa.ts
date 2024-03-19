import {BasePlugin, PluginSource} from "./base-plugin";
import {isMatch} from 'lodash';
import {registerCustomEventWithTimeout} from "../../../../helpers/custom-events";
import {EventType, ScreenSetEvents} from "../screen-set-events";
import {IAfterSubmitEvent, IErrorEvent} from "../../events.interface";
import {fromPlugin} from "../../../../helpers/utils";

export enum TfaMode {
    Register,
    Verify,
    Edit
}

export const TFASelectors = {
    changeDevice: '.gig-tfa-button-change-device',
    backupCodes: '.gig-tfa-button-backup-codes',
    codeTextBox: '.gig-tfa-code-textbox',
    submit: '.gig-tfa-button-submit',
    send: '.gig-tfa-button-send',
    errorMessage: '.gig-tfa-error',
    backupCodesList: '.gig-tfa-totp-backup-codes',
    useBackupCodeLink: '.gig-tfa-use-backup-code',
    generateNewCodesLink: '.gig-tfa-generate-new-codes',
    confirmGenerateNewCodesButton: '.gig-backup-codes-confirm',
    cancelButton: '.gig-backup-codes-cancel'
};

export enum TfaScreen {
    TotpRegistration = 'tfa-totp-registration',
    TotpChangeDevice = 'tfa-totp-change-device',
    TotpBackupCodes = 'tfa-backup-codes',
    TotpGenerateCodes = 'tfa-backup-codes-regenerate',
    TfaEdit = 'tfa-edit',
    TfaPhoneCodeResend = 'tfa-phone-code-resend'
}

export interface ITFAScreenEvent {
    screen: string;
    caption?: string;
}

const screenButtons = new Map<TfaScreen, string>();
screenButtons.set(TfaScreen.TotpChangeDevice, 'gig-tfa-button-change-device');
screenButtons.set(TfaScreen.TotpBackupCodes, 'gig-tfa-button-backup-codes');
screenButtons.set(TfaScreen.TotpGenerateCodes, 'gig-tfa-generate-new-codes');
screenButtons.set(TfaScreen.TfaPhoneCodeResend, 'gig-tfa-phone-code-resend');

export class TFAPlugin extends BasePlugin {

    private _nextScreen: Promise<ITFAScreenEvent>;

    constructor(protected ref: HTMLDivElement, protected screenSetEvents: ScreenSetEvents) {
        super(ref, screenSetEvents);
        const waitForNextScreen = (): Promise<ITFAScreenEvent> => {
            return new Promise((resolve, reject) => {
                const criteria = e => fromPlugin(e, PluginSource.ShowTFAUI) && isMatch(e, {eventName: 'afterScreenLoad', source: 'showScreenSet'});
                const callback = e => {
                    resolve(e);
                    this._nextScreen = waitForNextScreen();
                };
                registerCustomEventWithTimeout(criteria, callback, reject, 'screen load');
            })
        };
        this._nextScreen = waitForNextScreen();
    }

    public get errorMessage(): string {
        const errorContainer = this.ref.querySelector(TFASelectors.errorMessage) as HTMLDivElement;
        return errorContainer ? errorContainer.innerText : '';
    }

    public get mode(): TfaMode {
        return TFAPlugin.getModeByClass(this.ref.parentElement.className);
    }

    public switchScreen(screen: TfaScreen): Promise<ITFAScreenEvent> {
        const buttonClass = screenButtons.get(screen);
        const btnEl = this.ref.querySelector(`.${buttonClass}`) as HTMLElement;
        if(!btnEl) {
            throw new Error(`Can't find button "${buttonClass}"`);
        }
        btnEl.click();
        return this._nextScreen;
    }

    public verify(code: string): Promise<boolean> {
        const codeInput = this.ref.querySelector(TFASelectors.codeTextBox) as HTMLInputElement;
        if(!codeInput) {
            throw new Error(`Can't find code input`);
        }
        codeInput.value = code;
        return this.submit();
    }

    public useBackupCode(code: string): Promise<boolean> {
        const useBackupCodeLink = this.ref.querySelector(TFASelectors.useBackupCodeLink) as HTMLAnchorElement;
        if(!useBackupCodeLink) {
            throw new Error(`Can't find "use backup code" link`);
        }
        useBackupCodeLink.click();
        return this.verify(code);
    }

    public generateNewCodes(): Promise<ITFAScreenEvent> {
        const generateBackupCodesLink = this.ref.querySelector(TFASelectors.generateNewCodesLink) as HTMLAnchorElement;
        if(!generateBackupCodesLink) {
            throw new Error(`Can't find "generate backup code" link`);
        }
        generateBackupCodesLink.click();
        const confirmGenerateBackupCodesButton = this.ref.querySelector(TFASelectors.confirmGenerateNewCodesButton) as HTMLElement;
        if(!confirmGenerateBackupCodesButton) {
            throw new Error(`Can't find "confirm generate backup code" button`);
        }
        confirmGenerateBackupCodesButton.click();
        return this._nextScreen;
    }

    public generateNewCodesActivation(code:string): HTMLDivElement {
        const generateBackupCodesLink = this.ref.querySelector(TFASelectors.generateNewCodesLink) as HTMLAnchorElement;
        if(!generateBackupCodesLink) {
            throw new Error(`Can't find "generate backup code" link`);
        }

        const event = new KeyboardEvent("keydown",{
            "code": code
        });
        generateBackupCodesLink.dispatchEvent(event);
        return this.ref;
    }

    public cancelNewCodesOnEvent(code:string): HTMLDivElement {
        const cancelButton = this.ref.querySelector(TFASelectors.cancelButton);
        if(!cancelButton) {
            throw new Error(`Can't find "generate backup code" link`);
        }
        const event = new KeyboardEvent("keydown",{
            "code": code
        });
        cancelButton.dispatchEvent(event);
        return this.ref;
    }

    public submit(): Promise<boolean> {
        const submitButton = this.ref.querySelector(`${TFASelectors.submit}, ${TFASelectors.send}`) as HTMLElement;
        if(!submitButton) {
            throw new Error(`Can't find submit button`);
        }
        submitButton.click();
        return new Promise(resolve => {
            this.screenSetEvents.addHook<IAfterSubmitEvent>(EventType.onAfterSubmit, () => resolve(true));
            this.screenSetEvents.addHook<IErrorEvent>(EventType.onError, () => resolve(false));
            setTimeout(() => resolve(false),100);
        });
    }

    public get backupCodes(): string[] {
        const list = this.ref.querySelector(TFASelectors.backupCodesList) as HTMLElement;
        if(!list) {
            throw new Error(`Can't find backup codes`);
        }
        return TFAPlugin.getBackUpCodesListAsArray(list);
    }

    public async submitWithEnterKey(): Promise<boolean> {
        const submitButton = this.ref.querySelector(`${TFASelectors.submit}, ${TFASelectors.send}`) as HTMLElement;
        const listenInput = this.ref.querySelector(`${TFASelectors.codeTextBox}`) as HTMLInputElement;
        if(!submitButton && !listenInput) {
            throw new Error(`Can't find submit button`);
        }
        const eventEnter = new KeyboardEvent("keyup",{
            "key": "Enter"
        });
        listenInput.dispatchEvent(eventEnter);
        return new Promise(resolve => {
            this.screenSetEvents.addHook<IAfterSubmitEvent>(EventType.onAfterSubmit, () => resolve(true));
            this.screenSetEvents.addHook<IErrorEvent>(EventType.onError, () => resolve(false));
            setTimeout(() => resolve(false),100);
        });

    }

    public switchToBackupCode() {
        const useBackupCodeLink = this.ref.querySelector(TFASelectors.useBackupCodeLink) as HTMLAnchorElement;
        if(!useBackupCodeLink) {
            throw new Error(`Can't find "use backup code" link`);
        }
        useBackupCodeLink.click();
    }

    private static getModeByClass(className: string): TfaMode {
        if(className.includes('gigya-composite-control-tfa-register')) {
            return TfaMode.Register;
        }
        if(className.includes('gigya-composite-control-tfa-verify')) {
            return TfaMode.Verify;
        }
        if(className.includes('gigya-composite-control-tfa-edit')) {
            return TfaMode.Edit;
        }
    }

    private static getBackUpCodesListAsArray(list: HTMLElement) {
        const listItems = list.querySelectorAll<HTMLElement>('li');
        return Array.from(listItems).map(childElem => childElem.children[0].innerHTML);
    }
}

BasePlugin.registerPlugin(PluginSource.ShowTFAUI, TFAPlugin);
