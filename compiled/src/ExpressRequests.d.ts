import { Request } from "express";
export declare class ExpressRequests {
    static GetIp(request: Request): string;
    static GetUserAgent(request: Request): string;
}
