import {ControlCollectionTemplate} from "../control-collection-template";

export enum ConditionType {
    VisibleWhen = 'data-condition',
    Domains = 'data-domains',
    ApiKeys = 'data-apikeys',
    Probability = 'data-prob',
    AfterDate = 'data-after-date',
    BeforeDate = 'data-before-date',
    EmptyFields = 'data-empty-fields',
    LoginIdentities = 'data-login-identities'
}

export enum ConditionParam {
    KeepVisible = 'data-on-render'
}

export interface ConditionValue {
    rule: string;
    params?: Map<ConditionParam, string>;
}

const conditionParamsMap = new Map<ConditionType, ConditionParam[]>();
conditionParamsMap.set(ConditionType.VisibleWhen, [ConditionParam.KeepVisible]);

export enum SpecialLoginIdentity {
    Site = 'site',
    SiteOnly = 'site-only',
    Social = 'social',
    SocialOnly = 'social-only',
    SiteAndSocial = 'site-and-social'
}
export type LoginIdentity = SpecialLoginIdentity | string;

export class ContainerTemplate extends ControlCollectionTemplate {
    private _conditions = new Map<ConditionType, ConditionValue>();
    constructor(private _containerRef: HTMLDivElement) {
        super(_containerRef);
        this._containerRef.className = 'gigya-container';
    }

    public conditionalRule(type: ConditionType, jsExp: string) {
        this._conditions.set(type, {rule: jsExp});
        this._containerRef.setAttribute(type, jsExp);
    }

    public removeConditionalRule(type: ConditionType) {
        this._conditions.delete(type);
        this._containerRef.removeAttribute(type);
    }

    public withParam(param: ConditionParam, value: boolean | number | string) {
        this._conditions.forEach((condition, type) => {
            if(conditionParamsMap.get(type).indexOf(param) < 0) {
                throw new Error(`Parameter ${ConditionParam[param]} does not belong to condition ${ConditionType[type]}`);
            }
        });
        this._containerRef.setAttribute(ConditionParam[param], String(value));
    }

    public clear(): ContainerTemplate {
        super.clear();
        return this;
    }

    public addElement(el: HTMLDivElement) {
        this._containerRef.appendChild(el);
    }
}
