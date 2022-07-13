import * as log4js from "log4js";
import functions from "firebase-functions";
const isProduction = process.env.NODE_ENV === "production";
log4js.configure({
  appenders: {
    log: {
      type: "file",
      filename: "log.log",
      maxLogSize: 10485760,
      backups: 10,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["log"],
      level: isProduction ? "info" : "debug",
    },
  },
});

export const logger = isProduction ? functions.logger : log4js.getLogger("log");
