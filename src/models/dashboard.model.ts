import { Result } from "../common/interfaces";

const findDashList = async (connection: any) => {
  let result: Result;

  try {
    let sql1 = `SELECT u.name, lr.userId, lr.type, lr.startDate, lr.endDate, lr.status
    FROM leave_requests AS lr 
    INNER JOIN users AS u 
    ON u.userId = lr.userId
    WHERE u.isDelete = 0 
    AND lr.isDelete = 0;`;
    let sql2 = `SELECT COUNT(*) AS count 
    FROM users AS u
    INNER JOIN user_credentials AS uc  
    ON u.userId = uc.id
    WHERE uc.role = 'EMPLOYEE'
    AND u.isDelete = 0 
    AND uc.isDelete = 0;`;
    // let sql3 = `Select count(*) AS count FROM leave_requests where isDelete = 0;`;
    // let sql4 = `Select count(*) AS count FROM leave_requests where status = 'PENDING' AND isDelete = 0;`;
    // let sql5 = `Select count(*) AS count FROM leave_requests where status = 'APPROVED' AND isDelete = 0;`;
    let sql3 = `SELECT COUNT(*) AS total,
     SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending,
     SUM(CASE WHEN status = 'APPROVED' THEN 1 ELSE 0 END) AS approved
     FROM leave_requests WHERE isDelete = 0`;
    const params: any[] = [];
    const [[res], [res1], [res2]] = await Promise.all([
      connection.query(sql1, params),
      connection.query(sql2, params),
      connection.query(sql3, params),
    ]);
    let finalData: any = {};
    finalData.totalEmpCount = res1[0].count;
    finalData.totalLeaveRequests = res2[0].total;
    finalData.pendingLeaveRequest = res2[0].pending;
    finalData.approvedLeaveRequest = res2[0].approved;
    finalData.leaves = res;

    result = {
      success: true,
      message: "Dashboard fetched successfully",
      data: finalData,
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

export { findDashList };
