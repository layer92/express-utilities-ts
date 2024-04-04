import { NextFunction, Request, Response } from "express"

type ErrorHandlingFunction = (
    error:any, request:Request, response:Response, next:NextFunction
)=>void;

interface Config{
    onError?:ErrorHandlingFunction
}
/**
 * Catches server errors and send an appropriate response to the end user.
 */
export function MakeExpressStatusErrorHandlingMiddleware(
    config?:Config
){
    return (
        error:any, request:Request, response:Response, next:NextFunction
    )=>{
        if(config?.onError){
            config.onError(error,request,response,next);
        }
        return response.status(500).json();
    }
}