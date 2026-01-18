import { gray, green, red, yellow } from "colorette";
import winston, { format, transports } from "winston";


export const colorizeLevel = (level: string) => {
   switch(level){
      case "error":
         return red(level.toUpperCase());
      case "info":
         return green(level.toUpperCase());
      case "warn":
         return yellow(level.toUpperCase());
      default:
       return level;
   }
}

const logger: winston.Logger = winston.createLogger({
   level: "info",
   format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(({ timestamp, level, message}) => (
         `${gray(timestamp as string)} [${colorizeLevel(level)}] ${yellow(message as string)}`
      ))
   ),
   transports: [
      new transports.Console(),
      new transports.File({ filename: "logs/backendLogs.log"})
   ]
});

export default logger;