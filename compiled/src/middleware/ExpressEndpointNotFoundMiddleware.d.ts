import { NextFunction, Request, Response } from "express";
/**
    Place after all of your other middleware. (Can probably be before or after the error handling middleware.) Will return a 404 response if this middleware is reached without an error being next'd.
*/
export declare function ExpressEndpointNotFoundMiddleware(request: Request, response: Response, next: NextFunction): Response<any, Record<string, any>>;
