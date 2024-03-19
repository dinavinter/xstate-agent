import GSErrors = gigya.GSErrors;
import {GigyaResponse} from 'gigya';
import {ApiMockFactory} from '../../../mocks/api/mock-factory';
import {FlowBuilderEndpoint} from '../endpoints';
import mockBackend, {ProxyResponse} from '../mock-backend';
import {ScreenSetType} from '../../screen-sets/template/screen-set-template';
import {DefaultScreenID} from '../../screen-sets/template/screen-template';
import {ScreenSet} from '../../screen-sets/instance/screen-set';
import globalScreenSetEvent from '../../../helpers/global-screen-set-event';

export enum ActivityType {
    Event = 'Event',
    ScreenSet = 'ScreenSet',
}

enum InternalActivityType {
    Init = 'Init',
}

export interface FlowResponse {
    activityType: ActivityType;
    screenSet?: string;
    startScreen?: string;
    onSubmitUrl?: string;
    eventName?: string;
    afterEventUrl?: string;
}

type MockResponse = GigyaResponse & FlowResponse;

type FlowParams = {
    flowId: string;
    instanceId?: string;
    activityId?: string
}

export class ActivityProxy {
    public nextActivity?: ActivityProxy;
    public screenSet?: ScreenSet;
    private response: MockResponse;
    private resultPromise: Promise<ProxyResponse>;
    private readonly activityId: string;
    private readonly instanceId: string;

    constructor(private flowId: string, private type?: ActivityType | InternalActivityType) {
        this.response = ApiMockFactory.createResponse();
        this.activityId = ActivityProxy.generateId('activity'); // mock activity id
        this.instanceId = btoa(this.flowId).replace(/[\/=\+]/g, ''); // mock instance id
        if (type === ActivityType.ScreenSet) {
            globalScreenSetEvent.subscribe(screenSet => {
                this.screenSet = screenSet;
            });
        }
    }

    public get responseParam(): FlowResponse {
        const nextUrl = this.activityUrl || this.endURL;
        switch (this.type) {
            case ActivityType.Event:
                return {
                    activityType: this.type,
                    afterEventUrl: nextUrl,
                    eventName: this.response.eventName
                };
            case ActivityType.ScreenSet:
                return {
                    activityType: this.type,
                    onSubmitUrl: nextUrl,
                    screenSet: this.response.screenSet,
                    startScreen: this.response.startScreen
                }
            case InternalActivityType.Init:
            default:
                return null;
        }
    }

    public get activityUrl(): string {
        switch (this.type){
            case InternalActivityType.Init:
                return ActivityProxy.getEndpoint(FlowBuilderEndpoint.Dispatch, { flowId: this.flowId})
            case ActivityType.Event:
            case ActivityType.ScreenSet:
                return ActivityProxy.getEndpoint(FlowBuilderEndpoint.Execute, {
                    flowId: this.flowId,
                    activityId: this.activityId,
                    instanceId: this.instanceId
                });
        }
    }

    public build() {
        if (this.response.errorCode === GSErrors.OK) {
            this.response = {
                ...this.response,
                ...this.nextActivity?.responseParam
            }
        }
        this.resultPromise = mockBackend.when(this.activityUrl.startsWith('workflow') ? this.activityUrl : `workflow${this.activityUrl}`)
            .returnResponse(this.response)
            .waitForRequest();
    }

    public withEventName(name: string): ActivityProxy {
        this.response.eventName = name;
        return this;
    }

    public withScreenSet(screenSet: ScreenSetType): ActivityProxy {
        this.response.screenSet = `Default-${screenSet}`;
        return this;
    }

    public withStartScreen(startScreen: DefaultScreenID): ActivityProxy {
        this.response.startScreen = startScreen;
        return this;
    }

    public async waitForNextStep() {
        return this.resultPromise;
    }

    public returnOk(): ActivityProxy {
        return this.return(GSErrors.OK, null);
    }

    public return(errorCode: GSErrors, data: any): ActivityProxy {
        this.response.errorCode = errorCode
        this.response = {
            ...this.response,
            errorCode,
            ...data
        }
        return this;
    }

    private get endURL(): string {
        return ActivityProxy.getEndpoint(FlowBuilderEndpoint.Execute, {
            flowId: this.flowId,
            instanceId: this.instanceId,
            activityId: 'end-activity-url'
        });
    }

    private static generateId(prefix: string): string{
        return `${prefix}-${Math.random().toString(16).slice(2)}`
    }

    private static getEndpoint(endpointTemplate: FlowBuilderEndpoint, params: FlowParams): string {
        let endpoint = endpointTemplate.toString();
        for (const key of Object.keys(params)) {
            endpoint = endpoint.replace(`{${key}}`, params[key]);
        }
        return endpoint;
    }
}

export class FlowBuilder {
    private pos = 0;
    private steps: ActivityProxy[] = []
    constructor(private flowId: string) {
    }

    public init(): ActivityProxy {
        return this.addNewActivity(InternalActivityType.Init);
    }

    public addStep(type: ActivityType): ActivityProxy {
        return this.addNewActivity(type);
    }

    public build() {
        for (const step of this.steps) {
            step.build();
        }
    }

    public async nextStep() {
        return this.steps[this.pos++].waitForNextStep();
    }

    private addNewActivity(type: ActivityType | InternalActivityType): ActivityProxy {
        const activity = new ActivityProxy(this.flowId, type);
        if (this.steps.length) {
            const lastStep = this.steps[this.steps.length - 1];
            lastStep.nextActivity = activity;
        }
        this.steps.push(activity);
        return activity;
    }
}
