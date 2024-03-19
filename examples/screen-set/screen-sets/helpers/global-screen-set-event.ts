import {ScreenSet} from '../lib/screen-sets/instance/screen-set';

export type OnShowScreenSetHandler = (screenSet: ScreenSet) => void
export type Unsubscribe = () => void

class ShowScreenSetEvents {
    private handlers: OnShowScreenSetHandler[];
    public init() {
        this.handlers = [];
        const showScreenSet = gigya.accounts.showScreenSet;
        spyOn(gigya.accounts, 'showScreenSet').and.callFake( (params) => {
            const screenSet = new ScreenSet(params.screenSet, params.startScreen, params);
            for (const handler of this.handlers) {
                handler(screenSet);
            }
            screenSet.nextScreen();
            showScreenSet.call(this, params);
        });
    }

    public subscribe(handler: OnShowScreenSetHandler): Unsubscribe {
        this.handlers.push(handler);
        const pos = this.handlers.length - 1;
        return () => {
            this.handlers.splice(pos, 1);
        }
    }

    public dispose() {
        this.handlers = [];
    }
}

export default new ShowScreenSetEvents();
