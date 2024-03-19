import { GigyaWidget } from '../widget';
import { WidgetType } from '../../template/control-template';

const CONSENT_SELECTOR = {
    wrapper: '.consent',
    title: '.gigya-consent-title',
    approvedOnLabel: '.approved-on-label',
    approvedOn: '.approved-on',
    versionLabel: '.version-label',
    version: '.version',
    localeLabel: '.locale-label',
    locale: '.locale'
}

export const ConsentAttributes = {
    ApprovedOnLabel: 'data-approved-on-label',
    LocaleLabel: 'data-locale-label',
    VersionLabel: 'data-version-title-label',
    Version: 'data-version'
};

export class ConsentWidget extends GigyaWidget {

    public static get selector(): string {
        return 'div.gigya-consent'
    };

    private getElement(selector: keyof typeof CONSENT_SELECTOR): HTMLElement {
        return this.nativeElement.querySelector(CONSENT_SELECTOR[selector])
    }

    get title(): HTMLElement {
        return this.getElement('title')
    }

    get approvedOnLabel(): HTMLElement {
        return this.getElement('approvedOnLabel')
    }

    get versionLabel(): HTMLElement {
        return this.getElement('versionLabel')
    }

    get localeLabel(): HTMLElement {
        return this.getElement('localeLabel')
    }
}

GigyaWidget.addWidgetToLibrary(WidgetType.Consent, ConsentWidget);
