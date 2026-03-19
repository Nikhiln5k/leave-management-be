import { Result } from "../common/interfaces";
import { CreateLeaves } from "../common/interfaces/leaves.interface";
import db from "../db";
import * as leaveModel from "../models/leaves.model";

const createLeave = async (details: CreateLeaves) => {
  const connection = await db.getConnection();
  let result: Result;

  try {
    // ✅ 1. Get existing leaves for overlap check
    const existRes = await leaveModel.findLeave(connection, {
      userId: details.userId,
    });

    if (existRes.success && existRes.data?.length > 0) {
      const isOverlap = existRes.data.some((leave: any) => {
        return (
          new Date(details.startDate) <= new Date(leave.endDate) &&
          new Date(details.endDate) >= new Date(leave.startDate)
        );
      });

      if (isOverlap) {
        return {
          success: false,
          message: "Leave already applied for selected dates",
          data: [],
        };
      }
    }

    // ⚠️ IMPORTANT: get NEW connection (because old one released in model)
    const newConnection = await db.getConnection();

    // ✅ 2. Create leave
    const leaveRes = await leaveModel.create(newConnection, details);

    result = leaveRes;
  } catch (err: any) {
    console.error("Error in createLeave service", err);

    result = {
      success: false,
      message: "Failed to create leave",
      error: err.message,
    };
  }

  return result;
};

const getLeaves = async (filters: { userId?: number }) => {
  const connection = await db.getConnection();
  let result: Result;

  try {
    const leaveRes = await leaveModel.findLeave(connection, filters);
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

export { createLeave, getLeaves };