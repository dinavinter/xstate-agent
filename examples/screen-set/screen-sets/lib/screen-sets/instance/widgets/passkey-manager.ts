import {GigyaWidget} from '../widget';
import {WidgetType} from '../../template/control-template';

export const PasskeyManagerSelectors = {
    selector: 'div.gigya-passkey-card-manager',
    emptyListItemSelector: '.gigya-empty-list',
    emptyListItemActiveClass: 'gigya-empty-list-active',
    cardSelector: 'li.gigya-passkey-card'
};

export class PasskeyManagerWidget extends GigyaWidget {
    public static get selector(): string {
        return `${PasskeyManagerSelectors.selector}`;
    };

    public get isEmptyList() {
        return this.nativeElement
            .querySelector(PasskeyManagerSelectors.emptyListItemSelector)
            .classList.contains(PasskeyManagerSelectors.emptyListItemActiveClass);
    }

    public get cards() {
        return this.nativeElement.querySelectorAll(PasskeyManagerSelectors.cardSelector);
    }
}


GigyaWidget.addWidgetToLibrary(WidgetType.PasskeyManager, PasskeyManagerWidget);
