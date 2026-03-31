import { Request, Response } from "express";
import * as dashDelService from "../services/dashboard.service";
import responseHandler from "../common/helpers/responseHandler";

const getDashDedails = async (req: Request, res: Response) => {
  try {
    const result: any = await dashDelService.getDashDedails();

    if (result.success) {
      return responseHandler.successRes(
        res,
        result.data,
        "Leave list get successfully"
      );
    } else {
      return responseHandler.errorRes(
        res,
        result.message || "Failed to get leave list"
      );
    }
  } catch (error: any) {
    return responseHandler.errorRes(res, error.message);
  }
};
export { getDashDedails };
