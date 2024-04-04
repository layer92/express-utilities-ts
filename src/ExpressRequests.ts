import { Request } from "express";

export class ExpressRequests{
    static GetIp(request:Request){
        return request.header("x-forwarded-for") || request.connection.remoteAddress || undefined;
    }
    static GetUserAgent(request:Request){
        return request.header("User-Agent")||undefined;
    }
}