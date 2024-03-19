import { IProxyMiddleware, IProxyResponse, IRequestConditions } from "../mock-backend";

// gives precedence to the last added response
export class LastAddedMiddleware implements IProxyMiddleware {

    public run(req: IRequestConditions, responseCandidates: IProxyResponse[]): IProxyResponse[] {
        return [responseCandidates[responseCandidates.length - 1]];
    }
}