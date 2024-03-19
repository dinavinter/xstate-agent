import { IProxyMiddleware, IProxyResponse, IRequestConditions } from "../mock-backend";
import {constructRestUrl} from "../../../helpers/utils";

export class EndpointMiddleware implements IProxyMiddleware {

    public run(req: IRequestConditions, responseCandidates: IProxyResponse[]): IProxyResponse[] {
        return responseCandidates.filter(x => {
            const endpoint = constructRestUrl(x.conditions.endpoint, req.params);
            return endpoint === req.endpoint;
        });
    }
}