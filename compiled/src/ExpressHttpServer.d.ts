import { Application } from "express";
export interface ExpressHttpServerConfig {
    port: number;
    protocol: "http" | "https";
    sslPrivateKeyPath?: string;
    sslCertPath?: string;
    verbose?: boolean;
}
/**
 * Handles express server for you.
 * To start server, call startAsync()
 * Server will gracefully close when the process receives SIGTERM (following https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html), but if there is any specific cleanup logic you need to happen before server.close() gets called, you can provide that in the optional beforeClose callback.
 * */
export declare class ExpressHttpServer {
    private readonly _app;
    private readonly _config;
    private _options?;
    private _server?;
    constructor(_app: Application, _config: ExpressHttpServerConfig, _options?: {
        beforeClose?: () => void | Promise<void>;
    });
    /** If awaited, returns once the server starts listening. */
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
}
