import {MockBackend} from "../../lib/api/mock-backend";
import { isMatchWith } from "lodash";
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import MatchersUtil = jasmine.MatchersUtil;
import CallInfo = jasmine.CallInfo;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import {constructRestUrl} from "../utils";

export const receivedRequest = <CustomMatcherFactory>(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher => {
    return {
        compare: <CustomMatcher>(mockBackend: MockBackend, expectedEndpoint: string, expectedParams?: {[key:string]: string | jasmine.Any}, times?: number): CustomMatcherResult => {

            if (!mockBackend) {
                return {pass: false, message: "Custom matcher must be invoked with a MockBackend instance"};
            }

            if (!expectedEndpoint) {
                return {pass: false, message: "An endpoint must be specified when matching MockBackend calls"};
            }

            const allCalls: ReadonlyArray<CallInfo<jasmine.Func>> = mockBackend.received.calls.all();
            if(!allCalls.length){
                return {pass: false, message: "No calls have been made at all"};
            }

            const callsToEndpoint: ReadonlyArray<CallInfo<jasmine.Func>> = allCalls.filter(x => {
                const expectedMethod = constructRestUrl(expectedEndpoint, x.object.params);
                return x.object.method === expectedMethod
            });
            if(!callsToEndpoint.length){
                return {pass: false, message: `No matching calls to endpoint "${expectedEndpoint}"`};
            }

            let actualParams;
            if (expectedParams) {
                const callsToEndpointWithParams: ReadonlyArray<CallInfo<jasmine.Func>> = callsToEndpoint
                    .filter(x => isMatchWith(x.object.params, expectedParams, comparer));
                if(!callsToEndpointWithParams.length){
                    return {
                        pass: false,
                        message: `Expected endpoint "${expectedEndpoint}" to have been called with ${JSON.stringify(expectedParams, (k, v) => {
                            if(typeof v !== 'string' && (v as jasmine.Any).jasmineToString)
                                return (v as jasmine.Any).jasmineToString();
                            return v;
                        }, 4)} 
                            but got ${JSON.stringify(callsToEndpoint.map(x => x.object.params), null, 4)}`
                    };
                }
                actualParams = callsToEndpoint[0].object.params;
            }


            if(times && callsToEndpoint.length !== times) {
                return {
                    pass: false,
                    message: `Expected "${expectedEndpoint}" to have been called ${times} times, actually it was called ${callsToEndpoint.length} times`
                };
            }

            let msg = `Endpoint "${expectedEndpoint}" have been called`;
            if(expectedParams) {
                const expectedParamsActuallyCalled = Object.keys(actualParams).filter(key => expectedParams.hasOwnProperty(key)).reduce((obj, key) => {
                    obj[key] = actualParams[key];
                    return obj;
                }, {});
                msg += ` with ${JSON.stringify(expectedParamsActuallyCalled, null, 4)}`;
            }

            return {
                pass: true,
                message: msg
            };

        }
    };
};

function comparer(a: object, b: object) {
    if(b && b['expectedObject'])
        return b['expectedObject'](a) === a;
    if(typeof b === 'string' || typeof b === 'number')
        return a === b;
    return isMatchWith(a, b, comparer);
}
