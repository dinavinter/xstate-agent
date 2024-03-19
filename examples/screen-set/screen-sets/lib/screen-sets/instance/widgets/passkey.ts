import {GigyaWidget} from '../widget';
import {WidgetType} from '../../template/control-template';
import {EventType} from '../screen-set-events';
import {globalLoginEvents} from '../../../../helpers/global-login-events';

export const PasskeySelectors = {
    selector: 'div.gigya-passKey-widget',
    registerClass: 'gigya-composite-control-passkey-register-widget',
    loginClass: 'gigya-composite-control-passkey-login-widget',
    labelSelector: '.gigya-passkey-label',
    errorDisplaySelector: '.gigya-error-display',
    errorMessageSelector: '.gigya-error-msg',
};

export class PasskeyWidget extends GigyaWidget {
    protected get button() {
        return this.nativeElement.querySelector('button');
    }

    protected get errorDisplayElement() {
        return this.nativeElement.querySelector(PasskeySelectors.errorDisplaySelector)
    }

    public get isErrorVisible(): boolean {
        const position = this.errorDisplayElement.getBoundingClientRect();
        return position.top >= 0 && position.bottom <= window.innerHeight;
    }

    public get errorMessage(): string {
        return this.errorDisplayElement.textContent.trim();
    }

    public get disabled() {
        return this.button.getAttribute('disabled') === 'true';
    }
}

export class PasskeyLoginWidget extends PasskeyWidget {
    public static get selector(): string {
        return `.${PasskeySelectors.loginClass}`;
    };

    public async click() {
        this.button.click();
        let observer: MutationObserver;

        return Promise.race([
            new Promise(resolve => {
                this.screenSetEvents.addHook(EventType.onError, e => resolve(e));
            }),
            new Promise(resolve => {
                observer = new MutationObserver(resolve);
                observer.observe(this.errorDisplayElement, {
                    subtree: true,
                    childList: true
                });
            }),
            globalLoginEvents.first('accounts'),
            globalLoginEvents.first('socialize'),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]).then(() => {
            observer.disconnect();
        });
    }
}

export class PasskeyRegisterWidget extends PasskeyWidget {
    public static get selector(): string {
        return `.${PasskeySelectors.registerClass}`;
    };

    public async click() {
        this.button.click();
        let observer: MutationObserver;

        return Promise.race([
            new Promise(resolve => {
                this.screenSetEvents.addHook(EventType.onError, e => resolve(e));
            }),
            new Promise(resolve => {
                observer = new MutationObserver(resolve);
                observer.observe(this.errorDisplayElement, {
                    subtree: true,
                    childList: true
                });
            }),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]).then(() => {
            observer.disconnect();
        });
    }
}

GigyaWidget.addWidgetToLibrary(WidgetType.PasskeyLogin, PasskeyLoginWidget);
GigyaWidget.addWidgetToLibrary(WidgetType.PasskeyRegister, PasskeyRegisterWidget);
