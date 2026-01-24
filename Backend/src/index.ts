import http from 'http';
import { Server } from 'socket.io';
import { ENV } from './config/env';
import logger from './config/winston';
import {v4 as uuid } from "uuid";

const httpServer = http.createServer();
const port = ENV.PORT || 4000;

const io = new Server(httpServer, { cors: { origin: "*" }});
const waitingQueue: string[] = [];
const assignedPair = new Map<string, string>();

const handleLeave = (id: string) => {
   const index = waitingQueue.indexOf(id);
   if(index !== -1){
      waitingQueue.splice(index, 1);
   }
      const partner = assignedPair.get(id);
      if(partner){
         io.to(partner).emit("partner_left");
         assignedPair.delete(id);
         assignedPair.delete(partner);
      }
      
}

io.on("connection",(socket) => {
   logger.info(`Socket data ${socket.id}`);

   if(waitingQueue.includes(socket.id)) return;

   socket.on("start", () => {
      logger.info(`Socket connection`);
      if(waitingQueue.length > 0){
         const partner = waitingQueue.shift()!;
         const roomId = uuid();
         assignedPair.set(socket.id, partner);
         assignedPair.set(partner, socket.id);
         socket.emit("matched", roomId);
         socket.to(partner).emit("matched", roomId);
      } else {
         waitingQueue.push(socket.id);
         socket.emit("waiting")
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
   logger.info(`Server is runing is ${ENV.NODE_ENV} mode at http://localhost:${ENV.PORT}`);
});

const shutDownServer = () => {
   logger.info(`Shutting down server`);
   httpServer.close((err: unknown) => {
      if(err && err instanceof Error){
         logger.error(`Error during shutdown ${err.message}`);
         process.exit(1);
      }
      logger.info("Server closed successfully");
      process.exit(0);
   })
}

process.on("SIGTERM", shutDownServer); 
process.on("SIGINT", shutDownServer);








