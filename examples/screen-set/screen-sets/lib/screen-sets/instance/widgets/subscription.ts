import {GigyaWidget} from '../widget';
import {WidgetType} from '../../template/control-template';


export class SubscriptionWidget extends GigyaWidget {
    SubscriptionStatuses = {
       pendingConfirmation: "Pending Confirmation"
    }
    public static get selector(): string {
        return 'div.gigya-subscription';
    }

    public get label(): string {
        return this.nativeElement.querySelector('label').innerText;
    }

    public isDisplayingPendingConfirmation(): boolean {
        return this.subscriptionStatus?.innerText === this.SubscriptionStatuses.pendingConfirmation;
    }

    private get subscriptionStatus(): HTMLElement {
        return this.nativeElement.querySelector('.subscription-status-label');
    }
}

GigyaWidget.addWidgetToLibrary(WidgetType.Subscription, SubscriptionWidget);
