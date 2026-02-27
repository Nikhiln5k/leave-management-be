import { Request, Response } from "express";
import * as userService from "../services/user.service";
import responseHandler from "../common/helpers/responseHandler";
import { CreateUser } from "../common/interfaces/user.interface";

const createUser = async (req: Request, res: Response) => {
  // const { name, email, username, password, role } = req.body;
  const details: CreateUser = req.body;
  details.apiName = `${req.method} ${req.originalUrl}`;
  const result: any = await userService.createUser(details);
  if (result.success)
    return responseHandler.createRes(res, [], result.message);
  else if (result.message === "User already exists")
    return responseHandler.badReqRes(res, "User already exists");
  else return responseHandler.errorRes(res, result.message || "Failed to create user");
};

export { createUser };
