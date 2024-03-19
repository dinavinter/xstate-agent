import { ScreenSetParams } from "../events.interface";
import IMap = gigya.utils.array.IMap;

export interface IOtpData {
    vToken?: string;
}

export interface IPushData {
    vToken?: string;
}

export interface IFormData extends IMap<any> {
    rememberMe?: boolean;
}

export interface IExtraEventData {
    rememberMe?: boolean;
    allowAccountsLinking?: boolean;
}

export interface ISendCodeData {
  phoneNumber?: string;
  email?: string;
  phvToken?: string;
  regToken?: string;
}

export class ScreenSetData {
    constructor(public params: ScreenSetParams) {
        this.regToken = params.regToken;
        this.finalizeRegistrationNeeded = params.finalizeRegistration;
    }

    public apiData: any = {}; // Each form can have its own server API data
    public lastSubmittedFormID: string;
    public lastSubmittedFormResponse: any = {};
    public finalizeRegistrationNeeded: boolean = false;
    public neededData: IFormData = {};
    public extraEventData: IExtraEventData = {};
    public regToken: string;
    public otpData: IOtpData  = {};
    public pushData: IPushData  = {};
    public sendCodeData: ISendCodeData = {};
}
