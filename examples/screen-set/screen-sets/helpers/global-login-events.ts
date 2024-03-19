import { ILoginEvent } from "../lib/screen-sets/events.interface";
import { cloneDeep } from 'lodash';
import logger from "../lib/logger/logger";

interface IGlobalLoginEvents {
    first: (namespace?: 'accounts' | 'socialize') => Promise<ILoginEvent>;
    accounts: ILoginEvent[];
    socialize: ILoginEvent[];
}

let accountsLoginPromise: Promise<ILoginEvent>;
let socializeLoginPromise: Promise<ILoginEvent>;
let accountsLoginEventHandlerRef;
let socializeLoginEventHandlerRef;
let accountsLoginGlobalEvents = [];
let socializeLoginGlobalEvents = [];

const resolveAndSaveLoginEvent = (event, arr, loginPromiseResolve) => {
    arr.push(event);
    logger.group(`[Event]: ${event.eventName}`);
    logger.info(event).end();
    loginPromiseResolve(event);
};

export function initGlobalLoginEvents() {

    accountsLoginGlobalEvents = [];
    accountsLoginPromise = new Promise<ILoginEvent>(resolve => {
        accountsLoginEventHandlerRef = gigya.events.global.add("onLogin",
                event => resolveAndSaveLoginEvent(event, accountsLoginGlobalEvents, resolve),
            undefined, undefined, "accounts");
    });

    socializeLoginGlobalEvents = [];
    socializeLoginPromise = new Promise<ILoginEvent>(resolve => {
        socializeLoginEventHandlerRef = gigya.events.global.add("onLogin",
            event => resolveAndSaveLoginEvent(event, socializeLoginGlobalEvents, resolve),
            undefined, undefined, "socialize");
    });
}

export function teardownGlobalLoginEvents() {
    gigya.events.global.remove('accounts_onLogin', accountsLoginEventHandlerRef);
    gigya.events.global.remove('socialize_onLogin', socializeLoginEventHandlerRef);
}

export const globalLoginEvents: IGlobalLoginEvents = {

    first(namespace: 'accounts' | 'socialize' = 'accounts'): Promise<ILoginEvent> {
        let loginPromise;
        switch (namespace) {
            case "accounts":
                loginPromise = accountsLoginPromise;
                break;
            case "socialize":
                loginPromise = socializeLoginPromise;
                break;
        }
        return loginPromise;
    },

    get accounts(): ILoginEvent[] {
        return cloneDeep(accountsLoginGlobalEvents);
    },

    get socialize(): ILoginEvent[] {
        return cloneDeep(socializeLoginGlobalEvents);
    }
};
