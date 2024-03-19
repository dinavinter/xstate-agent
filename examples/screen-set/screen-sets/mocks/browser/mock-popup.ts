import logger from "../../lib/logger/logger";
import { Endpoint } from "../../lib/api/endpoints";
import { extractMethodNameFromUrl, extractParamsFromUrl, setTimeoutForOperation } from "../../helpers/utils";
import mockPopup from "../../lib/api/mock-popup";

export function setUpMockPopup(){

    window.open = (url?: string, target?: string, features?: string, replace?: boolean): Window => {
        const opener = window;
        const params = extractParamsFromUrl(url);
        const methodName = extractMethodNameFromUrl(url);
        const timeoutId = setTimeoutForOperation(`"${methodName}"`);
        const group = logger.group(`[Request]: ${methodName}`);
        group.info(`request: ${methodName}`, {params})
            .endWhen(mockPopup.getMessage(<Endpoint>methodName, params)
                .then(response => {
                    clearTimeout(timeoutId);
                    group.info(`response: ${methodName}`, {response});
                    opener.postMessage(response, opener.location.href);
                }).catch(console.error));
        return mockPopup as any;
    };
}