import {receivedRequest} from './matchers/api';
import {toBeClosed, toContainForm, toShowScreen} from "./matchers/screenSet";
import {toFireEvent, toFireEventsInSequence} from "./matchers/events";

export const customMatchers = {
    receivedRequest,
    toShowScreen,
    toBeClosed,
    toContainForm,
    toFireEvent,
    toFireEventsInSequence
};