import {GigyaWidget} from '../widget';
import {WidgetType} from '../../template/control-template';

export const PasskeyManagerCardSelectors = {
    selector: 'li.gigya-passkey-card',
    idAttribute: 'data-card-element-id',
    newCardClass: 'gigya-card-new',
    cardHeaderSelector: 'h3.gigya-card-header',
    cardLastLoginSelector: '.gigya-label-last-login-value',
    cardCountrySelector: '.gigya-label-country-value',
    cardIPSelector: '.gigya-label-last-login-ip-value',
    cardDeleteButtonSelector: 'button.gigya-remove-passkey-icon'
};

export class PasskeyManagerCardWidget extends GigyaWidget {
    public static get selector(): string {
        return `${PasskeyManagerCardSelectors.selector}`;
    };

    public get cardId() {
        return this.nativeElement.getAttribute(PasskeyManagerCardSelectors.idAttribute);
    }

    public get newCard() {
        return !!this.nativeElement.classList.contains(PasskeyManagerCardSelectors.newCardClass);
    }

    public get header() {
        return this.nativeElement.querySelector(PasskeyManagerCardSelectors.cardHeaderSelector).textContent;
    }

    public get lastLogin() {
        return this.nativeElement.querySelector(PasskeyManagerCardSelectors.cardLastLoginSelector).textContent;
    }

    public get country() {
        return this.nativeElement.querySelector(PasskeyManagerCardSelectors.cardCountrySelector).textContent;
    }

    public get ip() {
        return this.nativeElement.querySelector(PasskeyManagerCardSelectors.cardIPSelector).textContent;
    }

    public deletePasskey() {
        const button =  this.nativeElement.querySelector(PasskeyManagerCardSelectors.cardDeleteButtonSelector) as HTMLButtonElement;
        button.click();
    }
}


GigyaWidget.addWidgetToLibrary(WidgetType.PasskeyManagerCard, PasskeyManagerCardWidget);
