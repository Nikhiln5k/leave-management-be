import { LoggerExceptionPayload } from "../common/interfaces/loggerException.interface";
import db from "../db";
import { insertException } from "../models/loggerException.model";


export class LoggerException {
  static async insert(payload: LoggerExceptionPayload) {
    const connection = await db.getConnection();
    try {
      await insertException(connection, payload);
    } catch (err: any) {
      console.error("Failed to save logger exception", err);
    }
  }
}