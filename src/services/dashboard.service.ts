import { Result } from "../common/interfaces";
import db from "../db";
import * as findDashboard from "../models/dashboard.model";
const getDashDedails = async () => {
  const connection = await db.getConnection();
  let result: Result;

  try {
    const leaveRes = await findDashboard.findDashList(connection);
    result = leaveRes;
  } catch (err: any) {
    console.error("Error in getLeaves service", err);

    result = {
      success: false,
      message: "Failed to fetch leaves",
      error: err.message,
    };
  }

  return result;
};
export { getDashDedails };