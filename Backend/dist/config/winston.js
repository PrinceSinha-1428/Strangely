"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorizeLevel = void 0;
const colorette_1 = require("colorette");
const winston_1 = __importStar(require("winston"));
const colorizeLevel = (level) => {
    switch (level) {
        case "error":
            return (0, colorette_1.red)(level.toUpperCase());
        case "info":
            return (0, colorette_1.green)(level.toUpperCase());
        case "warn":
            return (0, colorette_1.yellow)(level.toUpperCase());
        default:
            return level;
    }
};
exports.colorizeLevel = colorizeLevel;
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(({ timestamp, level, message }) => (`${(0, colorette_1.gray)(timestamp)} [${(0, exports.colorizeLevel)(level)}] ${(0, colorette_1.yellow)(message)}`))),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "logs/backendLogs.log" })
    ]
});
exports.default = logger;
