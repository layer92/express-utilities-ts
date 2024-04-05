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
class ExpressHttpServer {
    constructor(_app, _config) {
        this._app = _app;
        this._config = _config;
    }
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
        this._server.listen(port);
        if (verbose) {
            console.log("Server started on port " + port + " using " + protocol.toUpperCase() + ".");
        }
    }
    stop() {
        this._server?.close();
    }
}
exports.ExpressHttpServer = ExpressHttpServer;
