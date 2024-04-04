"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExpressAllowMethodsMiddleware = void 0;
function MakeExpressAllowMethodsMiddleware(methods) {
    let methodsStringArray;
    if (methods === "*") {
        methodsStringArray = ["*"];
    }
    else {
        methodsStringArray = methods;
    }
    return (request, response, next) => {
        response.setHeader('Access-Control-Allow-Methods', methodsStringArray.join(", "));
        return next();
    };
}
exports.MakeExpressAllowMethodsMiddleware = MakeExpressAllowMethodsMiddleware;
