"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressEndpointNotFoundMiddleware = void 0;
/**
    Place after all of your other middleware. (Can probably be before or after the error handling middleware.) Will return a 404 response if this middleware is reached without an error being next'd.
*/
function ExpressEndpointNotFoundMiddleware(request, response, next) {
    return response.status(404).json({
        message: "API endpoint not found."
    });
}
exports.ExpressEndpointNotFoundMiddleware = ExpressEndpointNotFoundMiddleware;
;
