"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExpressStatusErrorHandlingMiddleware = void 0;
/**
 * Catches server errors and send an appropriate response to the end user.
 */
function MakeExpressStatusErrorHandlingMiddleware(config) {
    return (error, request, response, next) => {
        if (config?.onError) {
            config.onError(error, request, response, next);
        }
        return response.status(500).json();
    };
}
exports.MakeExpressStatusErrorHandlingMiddleware = MakeExpressStatusErrorHandlingMiddleware;
