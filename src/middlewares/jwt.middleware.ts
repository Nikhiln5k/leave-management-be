import { NextFunction, Request, Response } from "express";
import resHandler from "../common/helpers/responseHandler";
import jwt from "jsonwebtoken";

export const isvalid = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return resHandler.unauthorizedRes(res, "Unauthorized Access");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    (req as any).userData = decoded;

    next();
  } catch (err) {
    return resHandler.badReqRes(res, null, "Invalid Token");
  }
};
