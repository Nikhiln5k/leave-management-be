export const insertException = async (connection: any, data: any) => {
  try {
    await connection.beginTransaction();
    await connection.query(
      `INSERT INTO loggerexception (apiName, data, exception, timestamp) VALUES (?)`,
      [[
        data.apiName,
        typeof data.data === "string" ? data.data : JSON.stringify(data.data),
        data.exception,
        new Date(),
      ]],
    );
    await connection.commit();
  } catch (err: any) {
    await connection.rollback();
    console.error("Error in insertException", err);
  } finally {
    if (connection && typeof connection.release === "function") {
      connection.release();
    }
  }
};
