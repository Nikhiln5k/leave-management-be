import { CreateUserCred, Result } from "../common/interfaces";
import db from "../db";

const create = async (connection: any, details: CreateUserCred) => {
  let result: Result;
  try {
    const { username, password, roleId } = details;
    await connection.beginTransaction();
    const [res] = await connection.query(
      `INSERT INTO user_credentials (username, password, roleId) VALUES (?, ?, ?)`,
      [username, password, roleId],
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
    // let sql = `SELECT id, username, roleId FROM user_credentials WHERE isDelete = 0`;
    let sql = `SELECT uc.id, uc.username, uc.roleId, r.roleName FROM user_credentials uc
     INNER JOIN role r ON uc.roleId = r.id WHERE uc.isDelete = 0`;
    const params: any[] = [username];
    if (id) {
      sql += ` AND uc.id = ?`;
      params.push(id);
    } else if (email) {
      sql += ` AND uc.email = ?`;
      params.push(email);
    } else if (username) {
      sql += ` AND uc.username = ?`;
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
