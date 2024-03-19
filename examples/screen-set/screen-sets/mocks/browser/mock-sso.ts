import { isSsoHtmFrame } from "../../helpers/utils";
import mockSSO from "../../lib/api/mock-sso";
import mockBackend from "../../lib/api/mock-backend";
import {SSOFrameEndpoint} from "../../lib/api/endpoints";

type AddEventListenerFn = (el: HTMLElement, eventName: string, handler: Function) => void;

export function setUpMockSSO(){

    const originalAddEventListener: AddEventListenerFn = gigya.utils.DOM.addEventListener;
    gigya.utils.DOM.addEventListener = (el: HTMLElement, eventName: string, fnOnLoad: Function): void => {

        if (!isSsoHtmFrame(eventName, el))
            return originalAddEventListener(el, eventName, fnOnLoad);

        const originalAppendToBody = gigya.utils.DOM.appendToBody;
        gigya.utils.DOM.appendToBody = (iframe: HTMLIFrameElement) => {

            if (iframe !== el)
                return originalAppendToBody(iframe);

            // iframe need parentNode because the callback is going to remove the iframe from it.
            const iframeContainer =  document.createElement('div');
            iframeContainer.appendChild(iframe);
            fnOnLoad();

            mockSSO.processRequest(iframe);
            gigya.utils.DOM.appendToBody = originalAppendToBody;
        };
    };
}
