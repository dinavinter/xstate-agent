import {ConditionType} from "../../../lib/screen-sets/template/widgets/container-template";
import {apiKey} from "../../../helpers/setup/setup";

var date = new Date();
var tomorrowsDate = new Date();
var yesterdayDate = new Date();
tomorrowsDate.setDate(date.getDate() + 1);
yesterdayDate.setDate(date.getDate() - 1);

export const genericAttributeData = [
    {
        type: ConditionType.AfterDate,
        rule: yesterdayDate.toISOString(),
        result: true
    },
    {
        type: ConditionType.AfterDate,
        rule: tomorrowsDate.toISOString(),
        result: false
    },
    {
        type: ConditionType.BeforeDate,
        rule: tomorrowsDate.toISOString(),
        result: true
    },
    {
        type: ConditionType.BeforeDate,
        rule: yesterdayDate.toISOString(),
        result: false
    },
    {
        type: ConditionType.ApiKeys,
        rule: apiKey,
        result: true
    },
    {
        type: ConditionType.ApiKeys,
        rule: 'dsfsdfsdf',
        result: false
    },
    {
        type: ConditionType.ApiKeys,
        rule: `${apiKey},fgdfsdf`,
        result: true
    },
    {
        type: ConditionType.Probability,
        rule: '0',
        result: false
    },
    {
        type: ConditionType.Probability,
        rule: '1',
        result: true
    }
]
