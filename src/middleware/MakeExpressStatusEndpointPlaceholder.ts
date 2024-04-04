import { Router, NextFunction, Request, Response } from "express"

export function MakeExpressStatusEndpointPlaceholder(){
    const router = Router();
    router.get(
        "/status", (request:Request, response:Response, next:NextFunction)=>{

            return response.status(200).json({
                note: "placeholder",
            })
            
        }
    );
    return router;
}