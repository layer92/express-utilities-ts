"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressRequests = void 0;
class ExpressRequests {
    static GetIp(request) {
        return request.header("x-forwarded-for") || request.connection.remoteAddress || undefined;
    }
    static GetUserAgent(request) {
        return request.header("User-Agent") || undefined;
    }
}
exports.ExpressRequests = ExpressRequests;
