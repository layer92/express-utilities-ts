import { NextFunction, Request, Response } from "express";
export declare function MakeExpressAllowOriginsMiddleware(origins: "*" | string[]): (request: Request, response: Response, next: NextFunction) => void;
