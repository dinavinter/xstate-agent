import { IErrorEvent } from "../lib/screen-sets/events.interface";
import { cloneDeep } from 'lodash';
import logger from "../lib/logger/logger";

interface IGlobalLoginEvents {
    first: (namespace?: 'accounts' | 'socialize') => Promise<IErrorEvent>;
    accounts: IErrorEvent[];
    socialize: IErrorEvent[];
}

let accountsErrorPromise: Promise<IErrorEvent>;
let socializeErrorPromise: Promise<IErrorEvent>;
let accountsErrorEventHandlerRef;
let socializeErrorEventHandlerRef;
let accountsErrorGlobalEvents = [];
let socializeErrorGlobalEvents = [];

const resolveAndSaveErrorEvent = (event, arr, errorPromiseResolve) => {
    arr.push(event);
    logger.group(`[Event]: ${event.eventName}`);
    logger.info(event).end();
    errorPromiseResolve(event);
};

export function initGlobalErrorEvents() {

    accountsErrorGlobalEvents = [];
    accountsErrorPromise = new Promise<IErrorEvent>(resolve => {
        accountsErrorEventHandlerRef = gigya.events.global.add("onError",
                event => resolveAndSaveErrorEvent(event, accountsErrorGlobalEvents, resolve),
            undefined, undefined, "accounts");
    });

    socializeErrorGlobalEvents = [];
    socializeErrorPromise = new Promise<IErrorEvent>(resolve => {
        socializeErrorEventHandlerRef = gigya.events.global.add("onError",
            event => resolveAndSaveErrorEvent(event, socializeErrorGlobalEvents, resolve),
            undefined, undefined, "socialize");
    });
}

export function teardownGlobalErrorEvents() {
    gigya.events.global.remove('accounts_onError', accountsErrorGlobalEvents);
    gigya.events.global.remove('socialize_onError', socializeErrorGlobalEvents);
}

export const globalErrorEvents: IGlobalLoginEvents = {

    first(namespace: 'accounts' | 'socialize' = 'accounts'): Promise<IErrorEvent> {
        let errorPromise;
        switch (namespace) {
            case "accounts":
                errorPromise = accountsErrorPromise;
                break;
            case "socialize":
                errorPromise = socializeErrorPromise;
                break;
        }
        return errorPromise;
    },

    get accounts(): IErrorEvent[] {
        return cloneDeep(accountsErrorGlobalEvents);
    },

    get socialize(): IErrorEvent[] {
        return cloneDeep(socializeErrorGlobalEvents);
    },
};
