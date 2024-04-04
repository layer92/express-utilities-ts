import { Application } from "express";
export interface ExpressHttpServerConfig {
    port: number;
    protocol: "http" | "https";
    sslPrivateKeyPath?: string;
    sslCertPath?: string;
    verbose?: boolean;
}
export declare class ExpressHttpServer {
    private readonly _app;
    private readonly _config;
    private _server?;
    constructor(_app: Application, _config: ExpressHttpServerConfig);
    startAsync(): Promise<void>;
    stop(): void;
}
