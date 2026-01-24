"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const env_1 = require("./config/env");
const winston_1 = __importDefault(require("./config/winston"));
const uuid_1 = require("uuid");
const httpServer = http_1.default.createServer();
const port = env_1.ENV.PORT || 4000;
const io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
const waitingQueue = [];
const assignedPair = new Map();
const handleLeave = (id) => {
    const index = waitingQueue.indexOf(id);
    if (index !== -1) {
        waitingQueue.splice(index, 1);
    }
    const partner = assignedPair.get(id);
    if (partner) {
        io.to(partner).emit("partner_left");
        assignedPair.delete(id);
        assignedPair.delete(partner);
    }
};
io.on("connection", (socket) => {
    winston_1.default.info(`Socket data ${socket.id}`);
    if (waitingQueue.includes(socket.id))
        return;
    socket.on("start", () => {
        winston_1.default.info(`Socket connection`);
        if (waitingQueue.length > 0) {
            const partner = waitingQueue.shift();
            const roomId = (0, uuid_1.v4)();
            assignedPair.set(socket.id, partner);
            assignedPair.set(partner, socket.id);
            socket.emit("matched", roomId);
            socket.to(partner).emit("matched", roomId);
        }
        else {
            waitingQueue.push(socket.id);
            socket.emit("waiting");
        }
    });
    socket.on("next", () => {
        handleLeave(socket.id);
    });
    socket.on("disconnect", () => {
        handleLeave(socket.id);
    });
});
httpServer.listen(port, () => {
    winston_1.default.info(`Server is runing is ${env_1.ENV.NODE_ENV} mode at http://localhost:${env_1.ENV.PORT}`);
});
const shutDownServer = () => {
    winston_1.default.info(`Shutting down server`);
    httpServer.close((err) => {
        if (err && err instanceof Error) {
            winston_1.default.error(`Error during shutdown ${err.message}`);
            process.exit(1);
        }
        winston_1.default.info("Server closed successfully");
        process.exit(0);
    });
};
process.on("SIGTERM", shutDownServer);
process.on("SIGINT", shutDownServer);
