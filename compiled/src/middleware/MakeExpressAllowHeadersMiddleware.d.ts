import { NextFunction, Request, Response } from "express";
export declare function MakeExpressAllowHeadersMiddleware(headers: "*" | string[]): (request: Request, response: Response, next: NextFunction) => void;
