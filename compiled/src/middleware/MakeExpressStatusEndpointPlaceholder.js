"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeExpressStatusEndpointPlaceholder = void 0;
const express_1 = require("express");
function MakeExpressStatusEndpointPlaceholder() {
    const router = (0, express_1.Router)();
    router.get("/status", (request, response, next) => {
        return response.status(200).json({
            note: "placeholder",
        });
    });
    return router;
}
exports.MakeExpressStatusEndpointPlaceholder = MakeExpressStatusEndpointPlaceholder;
