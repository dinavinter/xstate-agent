import {GigyaWidget} from '../widget';
import {WidgetType} from '../../template/control-template';
import {ApiLinkAttributes} from '../../template/widgets/api-link-template';

export class ApiLinkWidget extends GigyaWidget {
    public static get selector(): string {
        return ApiLinkAttributes.selector;
    }

    public click() {
        this.nativeElement.click();
    }
}

GigyaWidget.addWidgetToLibrary(WidgetType.ApiLink, ApiLinkWidget);
