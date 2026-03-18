import { Request, Response } from "express";
import { CreateLeaves } from "../common/interfaces/leaves.interface";
import * as leavesService from "../services/leaves.service";
import responseHandler from "../common/helpers/responseHandler";

const createLeaves = async (req: Request, res: Response) => {
  const details: CreateLeaves = req.body;
  details.apiName = `${req.method} ${req.originalUrl}`;
  const result: any = await leavesService.createLeave(details);
  console.log(result, "result");
  if (result.success)
    return responseHandler.createRes(res, result, "Leave requst created successfully");
  else
    return responseHandler.errorRes(
      res,
      result.message || "Failed to create leave requst",
    );
};

export { createLeaves };
