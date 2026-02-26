import { Request, Response } from "express";
import { loginService } from "../services/login.service";
import responseHandler from "../common/helpers/responseHandler";
import { LogInEmp } from "../common/interfaces/login.interface";

export const loginController = async (req: Request, res: Response) => {
  const details: LogInEmp = req.body;
  const token = await loginService(details);
  if (token.message === "invalid password") {
    return responseHandler.badReqRes(res, token.message, token.data);
  } else if (token.success) {
    return responseHandler.successRes(res, token.message, token.data);
  } else {
    return responseHandler.errorRes(res, token.message, token.data);
  }
};
