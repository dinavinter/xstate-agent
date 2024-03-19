import {GigyaControl} from "./control";
import {WidgetType} from '../template/control-template';
import {ScreenSetEvents} from './screen-set-events';

export type IWidgetType = (new(...args) => GigyaWidget) & {
    selector: string;
};

export class GigyaWidget extends GigyaControl {
    private static WidgetsLibrary = new Map<WidgetType, IWidgetType>();

    public static selector;

    public constructor(protected nativeElement: HTMLDivElement, protected screenSetEvents: ScreenSetEvents) {
        super(nativeElement);
    }

    public static registerWidgets(nativeElement: HTMLDivElement, screenSetEvents: ScreenSetEvents) : GigyaWidget[] {
        const widgets = [];
        this.WidgetsLibrary.forEach((instance, type) => {
            const widgetElements = nativeElement.querySelectorAll(instance.selector);
            widgetElements.forEach(elem => {
                widgets.push(new instance(elem, screenSetEvents));
            })
        });

        return widgets;
    }

    public static addWidgetToLibrary(type: WidgetType, instance: IWidgetType) {
        this.WidgetsLibrary.set(type, instance);
    }
}
