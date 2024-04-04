import { NextFunction, Request, Response } from "express";
import { ExpressRequests } from "../ExpressRequests";
import { ForbiddenHttpStatusCode } from "@layer92/core";

export function MakeExpressIpWhitelistMiddleware(whitelist:string[]){
    return (
        request:Request, response:Response, next:NextFunction
    )=>{
        const ip = ExpressRequests.GetIp(request);
        if( !ip || !whitelist.includes(ip) ){
            return response.status(ForbiddenHttpStatusCode).json({});
        }else{
            next();
        }
    };
}