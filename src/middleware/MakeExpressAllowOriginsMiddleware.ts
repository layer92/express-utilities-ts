import { NextFunction, Request, Response } from "express";

export function MakeExpressAllowOriginsMiddleware(origins:"*"|string[]) {
    let originsStringArray:string[];
    if( origins==="*" ){
        originsStringArray = ["*"];
    }else{
        originsStringArray = origins;
    }
    return (
        request:Request, response:Response, next:NextFunction
    )=>{
        response.setHeader('Access-Control-Allow-Origin', originsStringArray.join(", "));
        return next();
    }
}