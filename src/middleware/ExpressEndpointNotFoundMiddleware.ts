import { NextFunction, Request, Response } from "express";

/**
    Place after all of your other middleware. (Can probably be before or after the error handling middleware.) Will return a 404 response if this middleware is reached without an error being next'd.
*/
export function ExpressEndpointNotFoundMiddleware(
    request:Request, response:Response, next:NextFunction
){
    return response.status(404).json({
        message:"Not found."
    });
};