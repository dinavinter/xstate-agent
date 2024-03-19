import logger from "../../logger/logger";
import {IBaseScreenSetEvent, ScreenSetHooks, ScreenSetListeners, ScreenSetParams} from "../events.interface";
import { registerCustomEventWithTimeout } from "../../../helpers/custom-events";

export class ScreenSetEvents {
    private _sequence: Array<IBaseScreenSetEvent> = [];
    private _listeners = <ScreenSetListeners>{ };
    private _internalHooks = <ScreenSetHooks>{
        onBeforeScreenLoad: [],
        onAfterScreenLoad: [],
        onFieldChanged: [],
        onBeforeValidation: [],
        onAfterValidation: [],
        onBeforeSubmit: [],
        onSubmit: [],
        onAfterSubmit: [],
        onHide: [],
        onError: []
    };

    public global: any[] = [];

    constructor(originalScreenSetParams) {
        Object.keys(this._internalHooks).forEach(eventName => {
            this._internalHooks[eventName].push(e => {
                logger.group(`[Event]: ${eventName}`);
                logger.info(e).end();
                this._sequence.push(e);
            });
            if(originalScreenSetParams[eventName]) {
                this._listeners[eventName] = originalScreenSetParams[eventName];
            }
        });
        registerCustomEventWithTimeout(e => {
            this.global.push(e);
        });
    }

    public addHook<T>(event: EventType, eventHandler: (e: T) => any) {
        this._internalHooks[EventType[event] as string].push(eventHandler);
    }

    public getSequence(...evtNames: string[]) {
        if(!evtNames.length) return this._sequence;
        return this._sequence
            .filter(e =>
                evtNames.find(ae => ae == e.eventName)
            );
    }

    public getHooksAsParams(): ScreenSetParams {
        return Object.keys(this._internalHooks).reduce((screenSetParams, eventName) => {
            screenSetParams[eventName] = e => {
                this._internalHooks[eventName].map(hook => hook(e));
                if(this._listeners[eventName]) {
                    return this._listeners[eventName](e);
                }
            };
            return screenSetParams;
        },{} as ScreenSetParams)
    }
}
export enum EventType {
    onBeforeScreenLoad,
    onAfterScreenLoad,
    onFieldChanged,
    onBeforeValidation,
    onAfterValidation,
    onBeforeSubmit,
    onSubmit,
    onAfterSubmit,
    onHide,
    onError
}
