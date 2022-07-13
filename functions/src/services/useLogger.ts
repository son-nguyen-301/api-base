import {Request} from "express";
import {logger} from "../config/log4js.config";

function useLogger(req: Request) {
  function logError(logMsg: string, errorStack: string) {
    logger.error(`[${req.requestId}][${logMsg}]: `, errorStack);
  }

  function logReqInfo(logMsg: string) {
    logger.info(`[${req.requestId}][${logMsg}][BODY REQ]: `, {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    });
  }

  return {
    logError,
    logReqInfo,
  };
}

export default useLogger;
