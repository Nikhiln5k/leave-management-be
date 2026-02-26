import { CreateUserCred, Result } from "../common/interfaces";
import db from "../db";

const create = async (connection: any, details: CreateUserCred) => {
  let result: Result;
  try {
    const { username, password, role } = details;
    await connection.beginTransaction();
    const [res] = await connection.query(
      `INSERT INTO user_credentials (username, password, role) VALUES (?, ?, ?)`,
      [username, password, role],
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

const findOne = async (
  connection: any,
  id?: number,
  username?: string,
  email?: string,
) => {
  let result: Result;
  try {
    let sql = `SELECT * FROM user_credentials WHERE isDelete = 0`;
    const params: any[] = [username];
    if (id) {
      sql += ` AND id = ?`;
      params.push(id);
    } else if (email) {
      sql += ` AND email = ?`;
      params.push(email);
    } else if (username) {
      sql += ` AND username = ?`;
      params.push(username);
    }
    const [res] = await connection.query(sql, params);
    result = { success: true, message: "User found successfully", data: res };
  } catch (err: any) {
    console.error("Error in finding user", err);
    result = {
      success: false,
      message: "Failed to find user",
      error: err.message,
    };
  } finally {
    connection.release();
  }
  return result;
};

export { create, findOne };
