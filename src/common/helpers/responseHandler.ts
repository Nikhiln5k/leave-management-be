import { Response } from "express";
import common from "../index";

export default {
  successRes: (res: Response, data: any, message: string = "Success") => {
    res.status(common.success).send({
      success: true,
      data,
      message,
    });
  },

  errorRes: (
    res: Response,
    error: any,
    message: string = "Internal Server Error",
  ) => {
    res.status(common.error).send({
      success: false,
      data: [],
      error,
      message,
    });
  },

  notFoundRes: (res: Response, message: string = "Data Not Found") => {
    res.status(common.notFound).send({
      success: false,
      data: [],
      message,
    });
  },

  createRes: (
    res: Response,
    data: any,
    message: string = "Creation Successful",
  ) => {
    res.status(common.created).send({
      success: true,
      data,
      message,
    });
  },

  badReqRes: (res: Response, error: any, message: string = "Bad Request") => {
    res.status(common.badReq).send({
      success: false,
      data: [],
      error,
      message,
    });
  },

  unauthorizedRes: (res: Response, message: string = "Unauthorized Access") => {
    res.status(common.unauthorized).send({
      success: false,
      data: [],
      message,
    });
  },

  forbiddenRes: (res: Response, message: string = "Access Denied") => {
    res.status(common.forbidden).send({
      success: false,
      data: [],
      message,
    });
  },
};
