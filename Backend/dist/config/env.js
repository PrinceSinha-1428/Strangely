"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
exports.ENV = {
    PORT: process.env.PORT,
    NODE_ENV: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development",
};
