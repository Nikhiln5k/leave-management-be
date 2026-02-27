import { Request, Response } from "express";
import { loginService } from "../services/login.service";
import responseHandler from "../common/helpers/responseHandler";
import { LogInEmp } from "../common/interfaces/login.interface";

export const loginController = async (req: Request, res: Response) => {
  const details: LogInEmp = req.body;

  const result = await loginService(details);

  if (result.message === "invalid password") {
    return responseHandler.badReqRes(res, result);
  } else if (result.success) {
    return responseHandler.successRes(res, result.data, result.message);
  } else {
    return responseHandler.errorRes(res, result.error, result.message);
  }
};
