import { isMatch } from "lodash";
import { IProxyMiddleware, IProxyResponse, IRequestConditions } from "../mock-backend";

export class ParamsMiddleware implements IProxyMiddleware {

    public run(req: IRequestConditions, responseCandidates: IProxyResponse[]): IProxyResponse[] {
        const matches = responseCandidates
            .filter(x => Object.keys(x.conditions.params).length)   // response with params condition
            .filter(x => isMatch(req.params, x.conditions.params)); // req.params contains conditions.params
        return matches.length ? matches : responseCandidates.filter(x => !Object.keys(x.conditions.params).length);
    }
}
