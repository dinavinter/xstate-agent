import {ConditionType} from "../../../lib/screen-sets/template/widgets/container-template";

export const loginIdentitiesData = [
    {
        type: ConditionType.LoginIdentities,
        rule: 'social',
        result: true,
        socialProviders: 'social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'social-only',
        result: true,
        socialProviders: 'social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-and-social',
        result: false,
        socialProviders: 'social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site',
        result: false,
        socialProviders: 'social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-only',
        result: false,
        socialProviders: 'social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-and-social',
        result: false,
        socialProviders: 'social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'social',
        result: false,
        socialProviders: 'site'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'social-only',
        result: false,
        socialProviders: 'site'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-and-social',
        result: false,
        socialProviders: 'site'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site',
        result: true,
        socialProviders: 'site'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-only',
        result: true,
        socialProviders: 'site'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-and-social',
        result: false,
        socialProviders: 'site'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'social',
        result: true,
        socialProviders: 'site,social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'social-only',
        result: false,
        socialProviders: 'site,social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-and-social',
        result: true,
        socialProviders: 'site,social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site',
        result: true,
        socialProviders: 'site,social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-only',
        result: false,
        socialProviders: 'site,social'
    },
    {
        type: ConditionType.LoginIdentities,
        rule: 'site-and-social',
        result: true,
        socialProviders: 'site,social'
    },
];
