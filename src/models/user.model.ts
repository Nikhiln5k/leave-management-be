import { Result } from "../common/interfaces";


const create = async (connection: any, details: any) => {
  let result: Result;
  try {
    await connection.beginTransaction();
    const { userId, name, email } = details;

    const [res] = await connection.query(
      `INSERT INTO users (userId, name, email) VALUES (?)`,
      [
        [
          userId,
          name,
          email
        ]
      ],
    );
    await connection.commit();
    result = { success: true, message: "User created successfully", data: res };
  } catch (err: any) {
    await connection.rollback();
    console.error("Error in creating user", err);
    result = {
      success: false,
      message: "Failed to create user",
      error: err.message,
    };
  } finally {
    connection.release();
  }
  return result;
};

export { create };
