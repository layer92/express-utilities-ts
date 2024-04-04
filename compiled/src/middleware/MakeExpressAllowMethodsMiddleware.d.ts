import { HttpMethodLowercase } from "@layer92/core";
import { NextFunction, Request, Response } from "express";
export declare function MakeExpressAllowMethodsMiddleware(methods: "*" | HttpMethodLowercase[]): (request: Request, response: Response, next: NextFunction) => void;
