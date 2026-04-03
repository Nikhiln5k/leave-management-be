import { Request, Response } from "express";
import { CreateLeaves } from "../common/interfaces/leaves.interface";
import * as leavesService from "../services/leaves.service";
import responseHandler from "../common/helpers/responseHandler";

const createLeaves = async (req: Request, res: Response) => {
  const details: CreateLeaves = req.body;
  details.apiName = `${req.method} ${req.originalUrl}`;
  
  const result: any = await leavesService.createLeave(details);
  if (result.success)
    return responseHandler.createRes(
      res,
      result,
      "Leave requst created successfully",
    );
  else
    return responseHandler.errorRes(
      res,
      result.message || "Failed to create leave requst",
    );
};

const getLeaves = async (req: Request, res: Response) => {
  try {
    const filters = {
      userId: req.query.userId ? Number(req.query.userId) : undefined,
    };

    const result: any = await leavesService.getLeaves(filters);

    if (result.success) {
      return responseHandler.createRes(
        res,
        result.data,
        "Leave list get successfully"
      );
    } else {
      return responseHandler.errorRes(
        res,
        result.message || "Failed to get leave list",
      );
    }
  } catch (error: any) {
    return responseHandler.errorRes(res, error.message);
  }
};

export { createLeaves, getLeaves };
