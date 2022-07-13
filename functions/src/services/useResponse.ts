import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import useLogger from "./useLogger";

function useResponse(req: Request, res: Response) {
  const {logError, logReqInfo} = useLogger(req);
  function successResponse<DataType>(data: DataType) {
    return res.status(StatusCodes.OK).send(data);
  }

  function errorResponse(
    statusCode: StatusCodes,
    message: string,
    errorStack: string,
  ) {
    logError(message, errorStack);
    logReqInfo(message);

    return res.status(statusCode).send(message);
  }

  return {
    successResponse,
    errorResponse,
  };
}

export default useResponse;
