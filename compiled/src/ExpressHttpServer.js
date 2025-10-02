"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressHttpServer = void 0;
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const core_1 = require("@layer92/core");
/**
 * Handles express server for you.
 * To start server, call startAsync()
 * Server will gracefully close when the process receives SIGTERM (following https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html), but if there is any specific cleanup logic you need to happen before server.close() gets called, you can provide that in the optional beforeClose callback.
 * */
class ExpressHttpServer {
    constructor(_app, _config, _options) {
        this._app = _app;
        this._config = _config;
        this._options = _options;
    }
    /** If awaited, returns once the server starts listening. */
    async startAsync() {
        const { port, protocol, sslCertPath, sslPrivateKeyPath, verbose } = this._config;
        if (protocol === "https") {
            (0, core_1.Expect)(sslPrivateKeyPath, `missing sslPrivateKeyPath`);
            (0, core_1.Expect)(sslCertPath, `missing sslCertPath`);
            this._server = https_1.default.createServer({
                key: fs_1.default.readFileSync(sslPrivateKeyPath),
                cert: fs_1.default.readFileSync(sslCertPath),
            }, this._app);
        }
        else {
            this._server = http_1.default.createServer(this._app);
        }
        await serverListenAsync(this._server, port);
        if (verbose) {
            console.log("Server started on port " + port + " using " + protocol.toUpperCase() + ".");
        }
        process.on("SIGTERM", async () => {
            if (verbose) {
                console.log(`SIGTERM received - gracefully shuttting down ${protocol.toUpperCase()} server on port ${port}.`);
            }
            await this._options?.beforeClose?.();
            await serverCloseAsync(this._server);
            if (verbose) {
                console.log(`Successfully closed ${protocol.toUpperCase()} server on port ${port}.`);
            }
        });
    }
    async stopAsync() {
        await this._options?.beforeClose?.();
        await serverCloseAsync(this._server);
    }
}
exports.ExpressHttpServer = ExpressHttpServer;
/** returns when the server has started listening */
async function serverListenAsync(server, port) {
    return new Promise((accept, reject) => {
        try {
            server.listen(port, 
            // docs: "The last parameter callbackwill be added as a listener for the 'listening' event."
            () => accept());
        }
        catch (error) {
            reject(error);
        }
    });
}
async function serverCloseAsync(server) {
    return new Promise((accept, reject) => {
        try {
            server.close(
            // docs: "The optional callback will be called once the 'close' event occurs ... it will be called with an Error as its only argument if the server was not open when it was closed."
            (maybeError) => {
                if (maybeError) {
                    reject(maybeError);
                }
                else {
                    accept();
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
