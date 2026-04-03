import jwt from "jsonwebtoken";
import { findOne } from "../models/userCred.model";
import bcrypt from "bcrypt";
import { Result } from "../common/interfaces";
import { LogInEmp, masterLogIn } from "../common/interfaces/login.interface";
import db from "../db";
import { fetchMenuPermissions } from "./menuPermission.service";

export const loginService = async (details: LogInEmp) => {
  const connection = await db.getConnection();
  let result: Result;
  const user = await findOne(connection, undefined, details.username);
  if (!user.success) {
    return user;
  }
  //   const isMatch = await bcrypt.compare(details.password, user.data[0].password);

  //   if (!isMatch) {
  //    return result = {success: false, message: 'invalid password',data:[]};
  //   }
  const roleId = user.data[0].roleId;
  const menuPermissions = await fetchMenuPermissions(roleId);
  const token = jwt.sign(
    { id: user.data[0].id, role: user.data[0].roleName, menus: menuPermissions },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" },
  );

  return (result = {
    success: true,
    data: { token, user: user.data },
    message: "login success",
  });
};

export const masterLoginService = async (details: masterLogIn) => {
  const connection = await db.getConnection();
  try {
    const userRes = await findOne(connection, undefined, details.username);
    if (!userRes.success || !userRes.data?.length) {
      return {
        success: false,
        message: "User not found",
        data: [],
      };
    }
    const user = userRes.data[0];
    if (!user.password) {
      return {
        success: false,
        message: "Password not hashed. Please reset user password.",
        data: [],
      };
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(
      details.password?.trim(),
      user.password,
    );
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid Password",
        data: [],
      };
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );
    return {
      success: true,
      message: "LoginSuccessful",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error,
      message: error.message || "Something Went Wrong",
      data: [],
    };
  } finally {
    connection.release();
  }
};
