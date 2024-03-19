import { IProxyMiddleware, IProxyResponse, IRequestConditions } from "../mock-backend";

export class FilterMiddleware implements IProxyMiddleware {

    public run(req: IRequestConditions, responseCandidates: IProxyResponse[]): IProxyResponse[] {
        const matches = responseCandidates
            .filter(x => x.conditions.filter)
            .filter(x => x.conditions.filter(req.params));
        return matches.length ? matches : responseCandidates.filter(x => !Boolean(x.conditions.filter));
    }
}