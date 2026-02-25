import { Result } from "../common/interfaces";
import { CreateUser } from "../common/interfaces/user.interface";
import db from "../db";
import * as model from "../models/user.model";
import * as userCredModel from "../models/userCred.model";

const createUser = async (details: CreateUser) => {
  const connection = await db.getConnection();
  let result: Result; 
  const existRes = await userCredModel.findOne(connection, undefined, details.username);

  if (existRes.success && existRes.data?.length > 0) {
    result = { success: false, message: "User already exists", data: [] };
    return result;
  }

  const userCred = await userCredModel.create(connection, details); // create user credentials

  if(userCred.data && userCred.data.insertId) {
    details.userId = userCred.data.insertId;
  }

  const data = await model.create(connection, details); // create user
  result = data;
  return result;
};

export { createUser };
