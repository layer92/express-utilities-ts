"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExpressAllowOriginsMiddleware = void 0;
function MakeExpressAllowOriginsMiddleware(origins) {
    let originsStringArray;
    if (origins === "*") {
        originsStringArray = ["*"];
    }
    else {
        originsStringArray = origins;
    }
    return (request, response, next) => {
        response.setHeader('Access-Control-Allow-Origin', originsStringArray.join(", "));
        return next();
    };
}
exports.MakeExpressAllowOriginsMiddleware = MakeExpressAllowOriginsMiddleware;
