import {GigyaResponse} from "gigya";
import { GSErrors } from "../../../../../src/core/Gigya.Js/app/GSErrors";

export class ApiMockFactory {
    public static createResponse<T>(params: T = <T>{}): GigyaResponse & T {
        return <GigyaResponse & T> Object.assign({
            callId: 'mock-call-id',
            statusCode: 200,
            errorCode: GSErrors.OK,
            time: String(new Date())
        }, params);
    }
}
