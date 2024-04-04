import fs from "fs";
import { Application } from "express";
import http from "http";
import https from "https";
import {Expect} from "away-core";

export interface ExpressHttpServerConfig{
    port:number,
    protocol:"http"|"https",
    sslPrivateKeyPath?:string,
    sslCertPath?:string,
    verbose?:boolean,
}
export class ExpressHttpServer{

    private _server?:http.Server|https.Server;

    constructor(
        private readonly _app:Application,
        private readonly _config:ExpressHttpServerConfig
    ){
    }


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

        this._server.listen(port);
        
        if( verbose ){
            console.log("Server started on port "+port+" using "+protocol.toUpperCase()+".");
        }
    }

    stop(){
        this._server?.close();
    }
}