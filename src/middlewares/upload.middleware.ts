import { Request, Response, NextFunction } from "express";
import resCont from "../common/helpers/responseHandler";

export const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return resCont.badReqRes(res, err.message || "File upload error");
  }
  next();
};