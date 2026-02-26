import jwt from "jsonwebtoken";
import { findOne } from "../models/userCred.model";
import bcrypt from "bcrypt";
import { Result } from "../common/interfaces";
import { LogInEmp } from "../common/interfaces/login.interface";
import db from "../db";

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

  const token = jwt.sign(
    { id: user.data[0].id, role: user.data[0].role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" },
  );

  return (result = {
    success: true,
    message: "login success",
    data: { token },
  });
};
