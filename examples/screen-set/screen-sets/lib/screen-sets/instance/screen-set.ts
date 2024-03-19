import {GigyaScreen} from './screen';
import {DefaultScreenID} from '../template/screen-template';
import {IAfterScreenLoadEvent, IHideEvent, ScreenSetParams} from '../events.interface';
import {ScreenSetType} from '../template/screen-set-template';
import {EventType, ScreenSetEvents} from './screen-set-events';
import {registerCustomEventWithTimeout} from '../../../helpers/custom-events';
import {fromInstance, isLoadEvent} from '../../../helpers/utils';
import {ScreenSetData} from './screen-set-data';
import {GigyaForm} from './form';

export class ScreenSet {

    private _currentScreen: GigyaScreen;
    private readonly _events: ScreenSetEvents;

    constructor(private _screenSetID: string, startScreen?: DefaultScreenID | string,  public params: ScreenSetParams = {} as ScreenSetParams) {

        this._events = new ScreenSetEvents(params);

        Object.assign(params, this._events.getHooksAsParams());
        params.screenSet = _screenSetID;

        if(startScreen) {
            params.startScreen = String(startScreen)
        }
    }

    public get data(): ScreenSetData {
        return gigya._.plugins.instances.screenSet['data'] as ScreenSetData;
    }

    public get type(): ScreenSetType {
        return ScreenSetType[this._screenSetID.split('-')[1]];
    }

    public get events() {
        return this._events;
    }

    public show(): Promise<GigyaScreen> {
        gigya.accounts.showScreenSet(this.params);
        return this.nextScreen();
    }

    public hide(): Promise<IHideEvent> {
        if (this.currentScreen) {
            const promise = this._onHide();
            gigya.accounts.hideScreenSet({screenSet: this._screenSetID});
            return promise;
        }
    }

    public get currentScreen(): GigyaScreen {
        return this._currentScreen;
    }
    public get form(): GigyaForm {
        return this._currentScreen.form;
    }

    public get caption(): string {
        let captionElement = document.querySelector('.gigya-screen-dialog-caption');
        if(!captionElement) {
            captionElement = document.querySelector('.gigya-screen-caption');
        }
        if(captionElement) {
            return captionElement.innerHTML;
        }
        else {
            return '';
        }
    }

    public get errorMessage(): string {
        return this.currentScreen?.errorMessage || '';
    }

    public nextScreen(): Promise<GigyaScreen> {
        return Promise.race([
            this._onAfterScreenLoad()
                .then(() => this._onAfterPluginsLoad())
                .then(() => this._currentScreen),

            this._onHide()
                .then(() => null as GigyaScreen),

            new Promise<GigyaScreen>(resolve =>
                setTimeout(resolve, 2000)
            )
        ]);
    }

    public submit(fields: {} = {}): Promise<boolean> {
        return this._currentScreen.submit(fields);
    }

    private _onHide(): Promise<IHideEvent> {
        return new Promise(resolve => {
            this.events.addHook<IHideEvent>(EventType.onHide, e => {
                this._currentScreen = null;
                resolve(e);
            });
        });
    }

    private _onAfterScreenLoad(): Promise<IAfterScreenLoadEvent> {
        return new Promise<IAfterScreenLoadEvent>(resolve => {
            this.events.addHook<IAfterScreenLoadEvent>(EventType.onAfterScreenLoad,e => {
                this._screenSetID = gigya._.plugins.instances[e.instanceID]['_ID'];
                this._currentScreen = new GigyaScreen((e.abTesting?.variantId || e.currentScreen), this.events);
                resolve(e);
            });
        });
    }

    private _onAfterPluginsLoad(): Promise<any> {

        const criteria = (e, beforePluginLoadEvent) => {
            return isLoadEvent(e, beforePluginLoadEvent.params.source) &&
                fromInstance(e, beforePluginLoadEvent.params.instanceID);
        };

        const beforePluginLoadEvents = this.events.global
            .filter(beforePluginLoadEvent => beforePluginLoadEvent.eventName === 'beforePluginLoad') // all "beforePluginLoad" events
            .filter(beforePluginLoadEvent => !this.events.global.find(e => criteria(e, beforePluginLoadEvent))); // except those that already loaded

        if (beforePluginLoadEvents.length) {
            return Promise.all(
                beforePluginLoadEvents.map(
                    beforePluginLoadEvent => new Promise((resolve, reject) => {
                        registerCustomEventWithTimeout(e => criteria(e, beforePluginLoadEvent), resolve, reject, 'plugin load');
                    })
                ));
        }
    };

}
