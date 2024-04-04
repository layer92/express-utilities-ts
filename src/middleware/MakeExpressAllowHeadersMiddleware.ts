import { NextFunction, Request, Response } from "express";

export function MakeExpressAllowHeadersMiddleware(headers:"*"|string[]) {
    let headersStringArray:string[];
    if( headers==="*" ){
        headersStringArray = ["*"];
    }else{
        headersStringArray = headers;
    }
    return (
        request:Request, response:Response, next:NextFunction
    )=>{
        response.setHeader('Access-Control-Allow-Headers', headersStringArray.join(", "));
        return next();
    }
}