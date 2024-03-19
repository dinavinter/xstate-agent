import MatchersUtil = jasmine.MatchersUtil;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import {isEqual, groupBy, forOwn, isEmpty} from 'lodash';
import {ScreenSet} from "../../lib/screen-sets/instance/screen-set";
import {matchDifference} from "../utils";

export const toFireEvent = <CustomMatcherFactory>(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher => {
    return {
        compare: <CustomMatcher>(screenSet: ScreenSet, eventData: string | object | object[] = {}, times: number = 1): CustomMatcherResult => {

            if (!screenSet) {
                return {pass: false, message: "Custom matcher must be invoked with a ScreenSet instance"};
            }
            const eventName = typeof eventData === 'string' ? eventData : eventData['eventName'];

            if (!eventName) {
                return {pass: false, message: "event name must be specified to assert if fired"};
            }

            const eventSequence = screenSet.events.getSequence(eventName);
            if(!eventSequence.length) {
                return {
                    pass: false, message: `expected screen-set to dispatch event: ${eventName}, but none has been fired`
                };
            }

            if(!Array.isArray(eventData)) {
                eventData = [eventData];
            }

            if((<object[]>eventData).length > times) {
                times = (<object[]>eventData).length;
            }

            const actualSum = eventSequence.length > 1 ? `${eventSequence.length} times` : 'once';

            if(eventSequence.length !== times) {
                return {
                    pass: false, message: `expected event "${eventName}" to be fired ${times} times, actually it has been fired ${actualSum}`
                };
            }

            const diff = getEventDiffs(eventSequence, <object[]>eventData);

            if(!isEmpty(diff)) {
                return {
                    pass: false,
                    message: `event "${eventName}" has been fired ${actualSum} as expected, but there are some differences: ${JSON.stringify(diff)}`
                }
            }

            return {
                pass: true,
                message: `event "${eventName}" has been fired ${actualSum}`
            }

        }
    };
};

export const toFireEventsInSequence = <CustomMatcherFactory>(util: MatchersUtil, customEqualityTesters: CustomEqualityTester[]): CustomMatcher => {
    return {
        compare: <CustomMatcher>(screenSet: ScreenSet, expectedEvents: object[] = []): CustomMatcherResult => {

            if (!screenSet) {
                return {pass: false, message: "Custom matcher must be invoked with a ScreenSet instance"};
            }

            const expectedEventNames = expectedEvents.map(e => e['eventName']);

            const eventSequence = screenSet.events.getSequence(...expectedEventNames);
            if(!eventSequence.length) {
                return {
                    pass: false, message: `expected screen-set to dispatch events: [${expectedEventNames.join(',')}], but none has been fired`
                };
            }

            if(eventSequence.length !== expectedEvents.length) {
                return {
                    pass: false, message: `expected ${expectedEvents.length} events to be fired, actually ${eventSequence.length} events has been fired`
                };
            }

            const actualEventNames = eventSequence.map(e => e['eventName']);
            if(!isEqual(expectedEventNames, actualEventNames)) {
                return {
                    pass: false, message: `expected [${expectedEventNames.join(', ')}] events to be fired in sequence, 
                    actually they were called in a different order: [${actualEventNames.join(', ')}]`
                };
            }

            const diff = getEventDiffs(eventSequence, expectedEvents);

            if(!isEmpty(diff)) {
                return {
                    pass: false,
                    message: `events: [${actualEventNames.join(',')}] has been fired, but there are some differences: ${JSON.stringify(diff)}`
                }
            }

            return {
                pass: true,
                message: `events: [${actualEventNames.join(',')}] has been fired with expected data`
            }

        }
    };
};

function getEventDiffs(actualEvents: object[], expectedEvents: object[]) {
    const diffs = expectedEvents
        .filter(expectedEvent => typeof expectedEvent !== 'string')
        .map((ed, i) => {
            return Object.assign(matchDifference(actualEvents[i], ed), {eventName: ed['eventName']} as any);
        });
    const groupedByEventNames = groupBy(diffs, 'eventName');
    forOwn(groupedByEventNames, (value, key) => {
        if(groupedByEventNames[key].length) {
            groupedByEventNames[key] = groupedByEventNames[key][0];
        }
        delete groupedByEventNames[key]['eventName'];
        if(!Object.keys(groupedByEventNames[key]).length) {
            delete groupedByEventNames[key];
        }
    });
    return groupedByEventNames;
}
