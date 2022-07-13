import {Request} from "express";
import * as log4js from "log4js";
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

export const logError = (
  req: Request,
  logMsg: string,
  errorMsg: string,
  errorStack?: string,
  isFatal = false,
): void => {
  logger[isFatal ? "fatal" : "error"](
    `[${req.requestId}][${logMsg}]: `,
    errorStack,
  );
  logger.info(`[${req.requestId}][${logMsg}]: `, errorMsg);
  logger.info(`[${req.requestId}][${logMsg}][BODY REQ]: `, {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });
};

export const logger = log4js.getLogger("log");
