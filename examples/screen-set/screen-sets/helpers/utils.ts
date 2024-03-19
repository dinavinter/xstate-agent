import {transform, isEqual, isObject, forOwn, Dictionary, isMatch} from 'lodash';
import { defaultResponses } from "../mocks/api/default-responses";
import { createDefaultScreenSets, screenSetTemplateCollection } from "../lib/screen-sets/template/screen-set-template";
import { clone } from 'lodash';
import mockBackend from "../lib/api/mock-backend";

export function getScreenSetElementById<T extends Element>(id: string, parent: ParentNode = window.document): T {
    return <T>parent.querySelector(`#${id},[data-screenset-element-id=${id}]`);
}

export function isElementVisible(el: HTMLElement): boolean {
    return gigya.utils.DOM.isVisible(el);
}

export function setTimeoutForOperation(operation: string, onTimeout?: (e?: any) => void, timeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL - 1000){
    return setTimeout(() => {
        console.error(`!!! ${operation} did not finished within ${timeoutInterval}ms (jasmine.DEFAULT_TIMEOUT_INTERVAL - 1s) !!!`);
        if (onTimeout) onTimeout();
    }, timeoutInterval);
}

// TODO: use lodash (verify results are exactly the same)
export function extractParamsFromUrl(url: string) {
    const a = document.createElement('a') as HTMLAnchorElement;
    a.href = url;
    return a.search
        .replace(/^\?/, '')
        .split('&')
        .reduce(((res, item) => {
            const keyVal = item.split('=');
            res[keyVal[0]] = keyVal[1];
            return res;
        }), {});
}

export function extractMethodNameFromUrl(url: string) {
    const a = document.createElement('a') as HTMLAnchorElement;
    a.href = url;
    return a.pathname.replace(/^\//, '');
}

export function toLowerCaseKeys(obj: Object): Object {
    return transform(<Dictionary<Object>>obj, (result, val, key) =>
        result[key.toLowerCase()] = val
    );
}

function difference(object, base) {
    function changes(object, base) {
        return transform(object, function(result, value, key) {
            if (!isEqual(value, base[key])) {
                result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}

export function matchDifference(baseObject: object, sourceObject: object) {
    const diff = {};
    function changes(obj, src) {
        forOwn(src, function(value, key) {
            if(isObject(value) && isObject(obj[key])) {
                return changes(obj[key], value);
            }
            if (value && !isEqual(value, obj[key])) {
                diff[key] = {
                    actualValue: obj[key] || '',
                    expectedValue: value
                }
            }
        });
        return diff;
    }
    return changes(baseObject, sourceObject);
}

export function clearScreenSetsCache() {
    Object.keys(gigya._.plugins.instances).forEach(key => {
        const instance = gigya._.plugins.instances[key];
        instance && instance.dispose();
    });

    for(const cachedDiv of Array.from(document.querySelectorAll(`[id^='__gigyaScreenSet']`))) {
        cachedDiv.remove();
    }

    gigya['__screenSetPluginCache'] = {};
}

export function initMockBackend(){
    mockBackend.init();
}

export function stopPluginPollers(){
    Object.keys(gigya._.plugins.instances).forEach(key => {
        const plugin = gigya._.plugins.instances[key];
        if (plugin['_poller']){
            plugin['_poller'].stop();
        }
    });
}

export function initDefaultResponses(){
    defaultResponses
        .forEach((response, endpoint) => {
            mockBackend.when(endpoint)
                .returnResponse(clone(response));
        });
    createDefaultScreenSets();
}

export async function disposeScreenSetTemplates() {
    for (let screenSet of Array.from(screenSetTemplateCollection.values())) {
        await screenSet.dispose();
    }
    screenSetTemplateCollection.clear();
}

export function getTableCellsAsArray(table: HTMLTableElement) {
    return Array.from(table.rows).reduce((acc, row) => {
        return acc.concat(Array.from(row.cells).map(td => td.innerText));
    },[])
}

export function fromPlugin(e, source) {
    if (!e) return;
    return (e.sourceContainerID && e.sourceContainerID.includes(source)) || e.source == source;
}

export function fromInstance(e, instanceID) {
    return e && e.instanceID == instanceID;
}

export function isLoadEvent(e, source: string) {
    return isMatch(e, {eventName: 'load', source});
}

export function isCloseEvent(e, source: string) {
    return isMatch(e, {eventName: 'close', source});
}

export function isAfterResponseEvent(e, source: string) {
    return isMatch(e, {eventName: 'afterResponse', source});
}

export function getFirstMatchingOption(selectElement: HTMLSelectElement, testedString: string) {
    for(let i = 0; i < selectElement.length; i++) {
        const val = selectElement.options[i].value;
        if(val && testedString.startsWith(val)) {
            return i;
        }
    }
}

export function isSsoHtmFrame(eventName: string, el: HTMLElement) {
    return eventName === 'load' &&
        el instanceof HTMLIFrameElement &&
        el.id.includes('gig_sso')
}

export function isParentHasClass(nativeElement: HTMLElement, className :string): boolean {
    if (nativeElement.classList.contains(className)) {
        return true;
    }
    if (!nativeElement.parentElement) {
        return false;
    }
    return isParentHasClass(nativeElement.parentElement, className);
}
export function setParamsToPageURL(params: string): void {
    window.history.replaceState(null, '' , params)
}

export function constructRestUrl(endpoint: string, params: Object): string {
    const regex = /({(.*?)})/g;
    let match = regex.exec(endpoint);
    let url = endpoint;
    while (match !== null) {
        url = url.replace(match[1], params[match[2]] ?? '');
        match = regex.exec(endpoint);
    }

    return url;
}
