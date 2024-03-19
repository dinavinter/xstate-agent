import {GigyaWidget} from '../widget';
import {WidgetType} from '../../template/control-template';

const authMethodAttrName = 'data-auth-method';

export class AuthMethod extends GigyaWidget {
    public static get selector(): string {
        return `[${authMethodAttrName}]`;
    }

    public click() {
        this.nativeElement.click();
    }

    public get type() {
        return this.nativeElement.getAttribute(authMethodAttrName);
    }
}

GigyaWidget.addWidgetToLibrary(WidgetType.AuthMethod, AuthMethod);
