import { Result } from "../common/interfaces";

const create = async (connection: any, details: any) => {
  let result: Result;

  try {
    await connection.beginTransaction();

    const {
      userId,
      startDate,
      endDate,
      type,
      reason,
      status = "PENDING",
      managerComment = "",
      doc = null,
    } = details;

    const [res] = await connection.query(
      `INSERT INTO leave_requests 
      (userId, startDate, endDate, type, reason, status, managerComment, doc)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        startDate,
        endDate,
        type,
        reason,
        status,
        managerComment,
        doc,
      ]
    );

    await connection.commit();

    result = {
      success: true,
      message: "Leave created successfully",
      data: res,
    };
  } catch (err: any) {
    await connection.rollback();
    console.error("Error in creating leave", err);

    result = {
      success: false,
      message: "Failed to create leave",
      error: err.message,
    };
  } finally {
    connection.release();
  }

  return result;
};


// ✅ FIND LEAVE (needed for overlap check)
const findLeave = async (
  connection: any,
  filters: { userId?: number }
) => {
  let result: Result;

  try {
    let sql = `SELECT * FROM leave_requests WHERE isDelete = 0`;
    const params: any[] = [];

    if (filters.userId) {
      sql += ` AND userId = ?`;
      params.push(filters.userId);
    }

    const [res] = await connection.query(sql, params);

    result = {
      success: true,
      message: "Leave get successfully",
      data: res,
    };
  } catch (err: any) {
    console.error("Error in finding leave", err);

    result = {
      success: false,
      message: "Failed to get leave",
      error: err.message,
    };
  } finally {
    connection.release();
  }

  return result;
};

export { create, findLeave };