import { HttpMethodLowercase } from "@layer92/core";
import { NextFunction, Request, Response } from "express";


export function MakeExpressAllowMethodsMiddleware(methods:"*"|HttpMethodLowercase[]) {
    let methodsStringArray:string[];
    if( methods==="*" ){
        methodsStringArray = ["*"];
    }else{
        methodsStringArray = methods;
    }
    return (
        request:Request, response:Response, next:NextFunction
    )=>{
        response.setHeader('Access-Control-Allow-Methods', methodsStringArray.join(", "));
        return next();
    }
}