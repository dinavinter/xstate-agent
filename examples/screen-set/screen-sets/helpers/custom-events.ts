import {setTimeoutForOperation} from "./utils";
import { remove } from 'lodash';

let hooks = [];

export function registerCustomEventWithTimeout(
    criteria: (e) => boolean | void,
    callback?: (e) => void,
    onTimeout?: (e?: any) => void,
    operation?: string) {

    let timeoutId;

    const cleanUp = () => {
        remove(hooks, x => x === hook);
        if (timeoutId) clearTimeout(timeoutId);
    };

    if (operation) {
        timeoutId = setTimeoutForOperation(`'${operation}'`, () => {
            cleanUp();
            if (onTimeout) onTimeout();
        });
    }

    const hook = e => {
        if (criteria(e)) {
            cleanUp();
            if (callback) callback(e);
        }
    };

    hooks.push(hook);
}

export function setUpCustomsEventMap() {

    gigya.events.addMap({
        eventMap : [{
            args:[e => e],
            events: "*",
            method: e => {
                hooks.forEach(hook => hook(e));
            }
        }]
    });
}

export function resetCustomEvent(){
    hooks = [];
}
