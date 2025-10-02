"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExpressAllowOriginsMiddleware = void 0;
//TODO: add more wildcard support for subdomains, etc
function MakeExpressAllowOriginsMiddleware(origins) {
    return (request, response, next) => {
        if (origins === "*") {
            response.setHeader('Access-Control-Allow-Origin', "*");
            return next();
        }
        const origin = request.headers.origin;
        if (origins.includes(origin)) {
            response.setHeader('Access-Control-Allow-Origin', origin);
        }
        else {
            response.setHeader('Access-Control-Allow-Origin', origins.join(" OR "));
        }
        return next();
    };
}
exports.MakeExpressAllowOriginsMiddleware = MakeExpressAllowOriginsMiddleware;
