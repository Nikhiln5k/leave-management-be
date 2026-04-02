import { Request, Response } from "express";
import * as dashDelService from "../services/dashboard.service";
import responseHandler from "../common/helpers/responseHandler";

const getDashDedails = async (req: Request, res: Response) => {
  try {
    const apiName = `${req.method} ${req.originalUrl}`;
    const result: any = await dashDelService.getDashDedails({apiName});

    if (result.success) {
      return responseHandler.successRes(
        res,
        result.data,
        result.message || "Dashboard fetched successfully"
      );
    } else {
      return responseHandler.errorRes(
        res,
        result.message || "Failed to get dashboard details"
      );
    }
  } catch (error: any) {
    return responseHandler.errorRes(res, error.message);
  }
};
export { getDashDedails };
