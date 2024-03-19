import {ConditionType} from "../../../lib/screen-sets/template/widgets/container-template";

export const domainAttributes = [
    {
        type: ConditionType.Domains,
        rule: 'a.com',
        domain: "a.com",
        result: true
    },
    {
        type: ConditionType.Domains,
        rule: 'a.com,b.com',
        domain: "a.com",
        result: true
    },
    {
        type: ConditionType.Domains,
        rule: 'c.a.com',
        domain: "a.com",
        result: false
    },
    {
        type: ConditionType.Domains,
        rule: 'c.com',
        domain: "a.com",
        result: false
    },
    {
        type: ConditionType.Domains,
        rule: 'a.b.com',
        domain: "a.com",
        result: false
    }
]