import { NextFunction, Request, Response } from "express";
export declare function MakeExpressIpWhitelistMiddleware(whitelist: string[]): (request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>>;
