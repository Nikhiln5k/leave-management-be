import { Result } from "../common/interfaces";
import db from "../db";
import * as findDashboard from "../models/dashboard.model";
import { LoggerException } from "./loggerException.service";

const getDashDedails = async (data: any) => {
  const connection = await db.getConnection();
  let result: Result;

  try {
    const leaveRes = await findDashboard.findDashList(connection, data);
    const resPromise = leaveRes.data;
    if(!resPromise) return result = {
      success: false,
      data: [],
      message: "Failed to fetch dashboard details",
    };
    const [[res], [res1], [res2]] = resPromise;
    let finalData: any = {};

    finalData.totalEmpCount = res1[0].count;
    finalData.totalLeaveRequests = res2[0].total;
    finalData.pendingLeaveRequest = res2[0].pending;
    finalData.approvedLeaveRequest = res2[0].approved;
    finalData.leaves = res;
    leaveRes.data = finalData; // update the data with the final structured data
    result = leaveRes;
  } catch (err: any) {
    console.error("Error in getLeaves service", err);
    await LoggerException.insert({
      apiName: data?.apiName || "Unknown API",
      data: null,
      exception: err.message || String(err),
    });
    result = {
      success: false,
      message: "Failed to fetch leaves",
      error: err.message,
    };
  }

  return result;
};
export { getDashDedails };
