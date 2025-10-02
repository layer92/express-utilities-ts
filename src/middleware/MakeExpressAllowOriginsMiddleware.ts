import { NextFunction, Request, Response } from "express";

//TODO: add more wildcard support for subdomains, etc
export function MakeExpressAllowOriginsMiddleware(origins:"*"|string[]) {
    return (
        request:Request, response:Response, next:NextFunction
    )=>{
        if(origins==="*"){
            response.setHeader('Access-Control-Allow-Origin', "*");
            return next();    
        }
        const origin = request.headers.origin;
        if(origins.includes(origin)){
            response.setHeader('Access-Control-Allow-Origin', origin);
        }else{
            response.setHeader('Access-Control-Allow-Origin', origins.join(" OR "));
        }
        return next();
    }
}