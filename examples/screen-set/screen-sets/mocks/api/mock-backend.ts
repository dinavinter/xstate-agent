import logger from "../../lib/logger/logger";
import { Endpoint } from "../../lib/api/endpoints";
import { FilterMiddleware } from "../../lib/api/middlware/filter-middleware";
import { EndpointMiddleware } from "../../lib/api/middlware/endpoint-middleware";
import { ParamsMiddleware } from "../../lib/api/middlware/params-middleware";
import { LastAddedMiddleware } from "../../lib/api/middlware/last-added-middleware";
import { setTimeoutForOperation } from "../../helpers/utils";
import mockBackend from '../../lib/api/mock-backend';
import {RequestType} from "../../../../../src/core/ApiService/app/interfaces";
import {requestsAssertion} from "./requests-assertion";

mockBackend.use(new EndpointMiddleware());  // 1. match endpoint
mockBackend.use(new ParamsMiddleware());    // 2. match params
mockBackend.use(new FilterMiddleware());    // 3. match filter lambda
mockBackend.use(new LastAddedMiddleware()); // 4. match latest

export function setUpMockBackend() {
    gigya.XhrRequest.prototype.performSend = async function (requestType: RequestType, ignoreCacheTimeout?: boolean) {
        return new Promise((resolve) => {
            requestsAssertion(requestType, this.params, this.settings);
            const timeoutId = setTimeoutForOperation(`"${this.method}"`);
            const group = logger.group(`[Request]: ${this.method}`);
            group.info(`request: ${this.method}`, {params: this.params})
                .endWhen(mockBackend.getResponse(<Endpoint>this.method, this.params)
                    .then(response => {
                        clearTimeout(timeoutId);
                        group.info(`response: ${this.method}`, {response});
                        return resolve(response);
                    }).catch(console.error));
        });
    }
}
