import { NextFunction, Request, Response } from "express";
type ErrorHandlingFunction = (error: any, request: Request, response: Response, next: NextFunction) => void;
interface Config {
    onError?: ErrorHandlingFunction;
}
/**
 * Catches server errors and send an appropriate response to the end user.
 */
export declare function MakeExpressStatusErrorHandlingMiddleware(config?: Config): (error: any, request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>>;
export {};
