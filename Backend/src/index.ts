import http from 'http';
import { Server } from 'socket.io';
import { ENV } from './config/env';
import logger from './config/winston';

const httpServer = http.createServer();
const port = ENV.PORT || 4000;

const io = new Server(httpServer, { cors: { origin: "*" }});

io.on("connection",(socket) => {
   logger.info(`Socket data ${socket.id}`);
   socket.on("name", (data) => {
      logger.info(`Socket emitted data ${data}`);
   })
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








