"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExpressIpWhitelistMiddleware = void 0;
const ExpressRequests_1 = require("../ExpressRequests");
const core_1 = require("@layer92/core");
function MakeExpressIpWhitelistMiddleware(whitelist) {
    return (request, response, next) => {
        const ip = ExpressRequests_1.ExpressRequests.GetIp(request);
        if (!ip || !whitelist.includes(ip)) {
            return response.status(core_1.ForbiddenHttpStatusCode).json({});
        }
        else {
            next();
        }
    };
}
exports.MakeExpressIpWhitelistMiddleware = MakeExpressIpWhitelistMiddleware;
