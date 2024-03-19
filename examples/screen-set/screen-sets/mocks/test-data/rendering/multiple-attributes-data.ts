import {ConditionType} from "../../../lib/screen-sets/template/widgets/container-template";
import {apiKey} from "../../../helpers/setup/setup";

var date = new Date();
var tomorrowsDate = new Date();
var yesterdayDate = new Date();
tomorrowsDate.setDate(date.getDate() + 1);
yesterdayDate.setDate(date.getDate() - 1);

export const multipleAttributesData = [
    [
        {
            type: ConditionType.AfterDate,
            rule: yesterdayDate.toISOString(),
            result: true,
            description: "AfterDate with valid past date"
        },
        {
            type: ConditionType.ApiKeys,
            rule: apiKey,
            result: true,
            description: "data-apikeys with valid key"
        }
    ],
    [
        {
            type: ConditionType.AfterDate,
            rule: tomorrowsDate.toISOString(),
            result: false,
            description: "AfterDate with future date",
        },
        {
            type: ConditionType.ApiKeys,
            rule: apiKey,
            result: true,
            description: "data-apikeys with valid key"
        }
    ],
    [
        {
            type: ConditionType.AfterDate,
            rule: yesterdayDate.toISOString(),
            result: true,
            description: "AfterDate with past date",
        },
        {
            type: ConditionType.ApiKeys,
            rule: "asdsadsadsadasd",
            result: false,
            description: "data-apikeys with invalid key"
        }
    ],
    [
        {
            type: ConditionType.AfterDate,
            rule: tomorrowsDate.toISOString(),
            result: false,
            description: "AfterDate with future date",
        },
        {
            type: ConditionType.ApiKeys,
            rule: "asdsadsadsadasd",
            result: false,
            description: "data-apikeys with invalid key"
        }
    ],
];
