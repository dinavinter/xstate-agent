import { GSErrors } from "../../../../../src/core/Gigya.Js/app/GSErrors";
import mockBackend from "../../lib/api/mock-backend";

class MockSSO {

    public async processRequest(iframe: HTMLIFrameElement) {

        const anchorElement = document.createElement('a');
        anchorElement.href = iframe.src;
        const qs = gigya.utils.keyValue.deserialize(anchorElement.search);
        const params = gigya.utils.keyValue.deserialize(anchorElement.hash.split('#')[1]);

        let response: any;
        response = await mockBackend.getResponse(params.m, {});

        MockSSO.sendMessage(response, params.callbackID, params.d);
    }

    private static sendMessage(res: Object, callbackID: string, requestDomain: string): void {
        let strMessage = '';
        for (const p in res) {
            if (res[p] != null) {
                strMessage += escape(p + '=' + encodeURIComponent(res[p]) + '&');
            }
        }
        MockSSO.postMessageToParent(callbackID + '=' + strMessage, requestDomain);
    }

    private static postMessageToParent(message: any, targetOrigin: string, transfer?: Transferable[]): void {
        window.postMessage(message, targetOrigin, transfer);
    }
}

export default new MockSSO();
