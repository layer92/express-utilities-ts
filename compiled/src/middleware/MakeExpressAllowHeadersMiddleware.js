"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExpressAllowHeadersMiddleware = void 0;
function MakeExpressAllowHeadersMiddleware(headers) {
    let headersStringArray;
    if (headers === "*") {
        headersStringArray = ["*"];
    }
    else {
        headersStringArray = headers;
    }
    return (request, response, next) => {
        response.setHeader('Access-Control-Allow-Headers', headersStringArray.join(", "));
        return next();
    };
}
exports.MakeExpressAllowHeadersMiddleware = MakeExpressAllowHeadersMiddleware;
