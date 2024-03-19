import {ScreenSet} from '../lib/screen-sets/instance/screen-set';
import {setTimeoutForOperation} from './utils';
import {GSErrors} from '../../../../src/core/Gigya.Js/app/GSErrors'
import globalScreenSetEvent from './global-screen-set-event';


interface IInterruptionProxy {
    screenSet: ScreenSet;
    onShowScreenSet: (params: any) => void;
}

class Differed<T> {
    public resolve: (result: T) => void;
    public reject: (error) => void;
    public promise: Promise<T>;

    constructor(onResolve?: (T) => void, onReject?: (error) => void) {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = async (result) => {
                onResolve && await onResolve(result);
                resolve(result);
            }
            this.reject = async (error) => {
                onReject && await onReject(error);
                reject(error);
            };
        })
    }
}

export class InterruptionProxy implements IInterruptionProxy{
    public screenSet: ScreenSet;
    private differed: Differed<ScreenSet>;
    private timeoutId;

    constructor() {
        this.differed = new Differed<ScreenSet>(async (screenSet) => {
           clearTimeout(this.timeoutId);
           await screenSet.nextScreen();
        })
    }


    onShowScreenSet(params: any): void {
        this.screenSet = new ScreenSet(params.screenSet, null, params);
        this.differed.resolve(this.screenSet);
    }

    public waitForScreen(): Promise<ScreenSet> {
        if (this.screenSet) {
            return Promise.resolve(this.screenSet);
        }
        this.timeoutId = setTimeoutForOperation('interruption', () => {
            this.differed.reject('Timout waiting for interruption');
        });
        return this.differed.promise;
    }
}

class GlobalInterruption {
    private _interruptions: {[key: number]: IInterruptionProxy} = {};
    private unsubscribe;
    init() {
        this.unsubscribe = globalScreenSetEvent.subscribe(screenSet => {
            if (screenSet.params?.initialResponse?.errorCode) {
                const inter = screenSet.params?.initialResponse?.errorCode;
                this._interruptions[inter]?.onShowScreenSet(screenSet.params);
            }
        })
    }

    on(interruption: GSErrors): InterruptionProxy {
        const ip = new InterruptionProxy();
        if(!this._interruptions[interruption]) {
            this._interruptions[interruption] = ip
        }

        return ip;
    }

    clear() {
        this.unsubscribe();
        this._interruptions = {};
    }
}

export default new GlobalInterruption();


