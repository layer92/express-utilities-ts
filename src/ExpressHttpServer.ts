import fs from "fs";
import { Application } from "express";
import http from "http";
import https from "https";
import { Expect } from "@layer92/core";

export interface ExpressHttpServerConfig{
    port:number,
    protocol:"http"|"https",
    sslPrivateKeyPath?:string,
    sslCertPath?:string,
    verbose?:boolean,
}

/**
 * Handles express server for you.
 * To start server, call startAsync()
 * Server will gracefully close when the process receives SIGTERM (following https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html), but if there is any specific cleanup logic you need to happen before server.close() gets called, you can provide that in the optional beforeClose callback.
 * */
export class ExpressHttpServer{

    private _server?:http.Server|https.Server;

    constructor(
        private readonly _app:Application,
        private readonly _config:ExpressHttpServerConfig,
        private _options?:{
            beforeClose?:()=>void|Promise<void>,
        }
    ){
    }

    /** If awaited, returns once the server starts listening. */
    async startAsync(){

        const {port,protocol,sslCertPath,sslPrivateKeyPath,verbose} = this._config;

        if( protocol==="https"){
            Expect( sslPrivateKeyPath, `missing sslPrivateKeyPath`);
            Expect( sslCertPath ,`missing sslCertPath` );
            this._server = https.createServer(
                {
                    key: fs.readFileSync( sslPrivateKeyPath as string ),
                    cert: fs.readFileSync( sslCertPath as string ),
                },
                this._app
            )
        }else{
            this._server = http.createServer(this._app);
        }

        await serverListenAsync(this._server,port);
        if( verbose ){
            console.log("Server started on port "+port+" using "+protocol.toUpperCase()+".");
        }

        process.on("SIGTERM", async ()=>{
            if( verbose ){
                console.log(`SIGTERM received - gracefully shuttting down ${protocol.toUpperCase()} server on port ${port}.`);
            }
            await this._options?.beforeClose?.();
            await serverCloseAsync(this._server);
            if( verbose ){
                console.log(`Successfully closed ${protocol.toUpperCase()} server on port ${port}.`);
            }
        });
    }

    async stopAsync(){
        await this._options?.beforeClose?.();
        await serverCloseAsync(this._server);
    }
}

/** returns when the server has started listening */
async function serverListenAsync(server:http.Server|https.Server,port:number){
    return new Promise<void>((accept,reject)=>{
        try{
            server.listen(
                port,
                // docs: "The last parameter callbackwill be added as a listener for the 'listening' event."
                ()=>accept(),
            )
        }catch(error){
            reject(error);
        }
    })
}

async function serverCloseAsync(server:http.Server|https.Server){
    return new Promise<void>((accept,reject)=>{
        try{
            server.close(
                // docs: "The optional callback will be called once the 'close' event occurs ... it will be called with an Error as its only argument if the server was not open when it was closed."
                (maybeError)=>{
                    if(maybeError){
                        reject(maybeError);
                    }else{
                        accept();
                    }
                },
            )
        }catch(error){
            reject(error);
        }
    })
}